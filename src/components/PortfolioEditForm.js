import React from 'react';
import { firebase } from '../firebase/firebase';
import { history } from '../routers/AppRouter';
import moment from 'moment';
import PortCatSelect from './PortCatSelect';
import {camelCase} from 'lodash';
import { Link } from 'react-router-dom';
import {Container,  Row, Col, Tabs, Tab, Button } from 'react-bootstrap'
import MessageModal from  './MessageModal';
import uuid from 'uuid';
import PorfolioImageUploader from './PorfolioImageUploader';
import PortfolioEditSelect from './PortfolioEditSelect';
import ImageWithPreloader from './ImageWithPreloader';


class PortfolioEditForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.initState(props.portfolioItem)
    }


    initState(portfolioItem) {

        return {
            projectTitle: portfolioItem ? portfolioItem.projectTitle : '',
            shortDesc: portfolioItem ? portfolioItem.shortDesc : '',
            longDesc: portfolioItem ? portfolioItem.longDesc : '',            
            projectUrl: portfolioItem ? portfolioItem.projectUrl : '',
            techSpecs:  portfolioItem ? portfolioItem.techSpecs : '',
            previewImg: portfolioItem ? portfolioItem.previewImg : '',
            auxImgs: portfolioItem && portfolioItem.auxImgs ? portfolioItem.auxImgs : [],
            githubUrl:  portfolioItem ? portfolioItem.githubUrl : '',
            portcats:  portfolioItem && portfolioItem.portcats ? portfolioItem.portcats : [],
            msgModal: {
                show: false,
                type: 'INFO',
                message: ''
            },
            newPreviewImgAdded: false,
            isUploading: false,
            modalConfirm: this.onExitConfirm,
            lastUpdated: portfolioItem ? portfolioItem.lastUpdated : moment().valueOf(),
            createDate: portfolioItem ? portfolioItem.createDate : moment().valueOf(),
            isDirty: false
        }        
    }


    onTextChange = (e) => {
        let stateObj = {
            isDirty: true
        };
        const fldName = camelCase(e.target.id);
        stateObj[fldName] = e.target.value;
        this.setState(stateObj);
    }


    handlePortCatSelect = (e) => {
        const portcats = this.state.portcats;
        const {checked, value} = e.target;

        if(checked) {
            // add the id to the portcats array
            portcats.push(value);
        } else {
            // remove the id from the portcats array
            portcats.splice(portcats.indexOf(value), 1);
        }
        this.setState({
            portcats,
            isDirty: true
        });
    }


    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.projectTitle || !this.state.shortDesc) {
            // set error state - please provide a title and a description
            this.doErrorModal('You need to provide a title and a description.');
            return false;
        }

        if(!this.state.previewImg) {
            // set error state - add a preview image
            this.doErrorModal('You need to provide a main portfolio image.');
            return false;
        }

        if(!this.state.portcats || this.state.portcats.length === 0) {
            this.doErrorModal('At least one category is required');
            return false;
        }
        this.closeMsgModal();

        if(!this.state.newPreviewImgAdded) {
            this.doPostData();
            this.doSuccessModal('The portfolio entry was successfully saved');
        } else {
            this.setState({
                execPostFromUpload: true,
                newPreviewImgAdded: false
            })
        }       
    }


    // methods for the image upload component
    retrievePreviewImgUrl = (url) => {
        this.setState({ 
            previewImg: url})
    }

    retrieveAuxImgUrl = (url) => {
        const auxImgs = this.state.auxImgs;
        auxImgs.push(url);
        this.setState({ auxImgs: auxImgs })
    }


    showPreviewImgUploadSuccess = () => {
        this.doSuccessModal('The portfolio entry was successfully saved');
    }

    showAuxImgUploadSuccess = () => {
        this.doSuccessModal('Slideshow Image successfully added to portfolio');
    }

    updateNewPreviewImgAdded = (newFile) => {
        const tmppath = (window.URL || window.webkitURL).createObjectURL(newFile);
        this.setState({
            previewImg: tmppath,
            isDirty: true,
            newPreviewImgAdded: true
        })
    }

    doErrorModal = (error) => {
        this.doMsgModal('ERROR', error);
    }    

    doSuccessModal = (message) => {
        this.doMsgModal('SUCCESS', message);
    }

    doInfoModal = (message) => {
        this.doMsgModal('INFO',message);
    }


    doMsgModal = (type, message) => {
        this.setState({
            msgModal: {
                type,
                message,
                show: true
            }
        })        
    }

    closeMsgModal = () => {
        this.setState(
            {
                msgModal: {
                    type: 'INFO',
                    show: false,
                    message: ''
                }
            }
        )
    }

    doPostData = () => {
        this.props.onSubmit({
            projectTitle: this.state.projectTitle,
            shortDesc: this.state.shortDesc,
            longDesc: this.state.longDesc,
            projectUrl: this.state.projectUrl,
            previewImg: this.state.previewImg,
            techSpecs: this.state.techSpecs,
            portcats: this.state.portcats || [],
            createDate: this.state.createDate,
            githubUrl: this.state.githubUrl,
            auxImgs: this.state.auxImgs || [],
            lastUpdated: moment().valueOf()
        });
        this.setState({
            execPostFromUpload: false,
            isDirty: false
        })
    }


    doConfirmExit = (e) => {
        const isDirty = this.state.isDirty;
        if(isDirty) {
            this.doInfoModal('You have unsaved changes. Leave without saving your changes?');
        } else {
            this.onExitConfirm(e);
        }
    }

    onExitConfirm = (e) => {
        history.push('/dashboard/portfolio');
    }

    handleEditPortfolioItemClick = (newPortfolioItem) => {
        const newState = this.initState(newPortfolioItem);
        this.setState(this.initState(newState));
        history.push(`/dashboard/portfolio/edit/${newPortfolioItem.id}`);
    }


    doConfirmDelAuxImg = (e) => {
        this.setState({
            modalConfirm: this.handleDelAuxImg,
            modalCancel: this.handleCancelDelAuxImg
        });
        this.doInfoModal('Are you sure you want to delete this slide image');
    }

    handleCancelDelAuxImg = (e) => {
        this.closeMsgModal();
        this.setState({
            modalConfirm: this.doConfirmExit,
            modalCancel: this.closeMsgModal
        });
    }


    handleDelAuxImg = (e) => {
        e.preventDefault();
        const {auxImgs} = this.state;
        const auxImgIdx = e.target.getAttribute('data-idx');
        auxImgs.splice(auxImgIdx,1)
        this.setState({
            auxImgs
        });
        this.doPostData();
        this.handleCancelDelAuxImg(e);
        setTimeout(() => {
            this.doSuccessModal('Slideshow Image successfully removed');
        }, 500)
    }

    render() {
        return (
            <Container>
            <Row>
                <Col className="col-xs-12">
                <div className="float-right portfolio-dropdown"></div>
                <PortfolioEditSelect linkText={this.props.portfolioItem ? 'Edit Portfolio Item ' : 'Create New Portfolio Item'} isDirty={this.state.isDirty} handleClick={this.handleEditPortfolioItemClick} />

                </Col>
            </Row>
            
            <div className="card text-white bg-secondary mb-3">

                <MessageModal 
                    onHide={this.closeMsgModal} 
                    onConfirm={this.state.modalConfirm} 
                    show={this.state.msgModal.show} 
                    type={this.state.msgModal.type} 
                    message={this.state.msgModal.message} 
                    />
                <div className="card-body">
                    <form id="form-portfolio"  onSubmit={this.onSubmit}>
                    <Row>
                        <Col className="col-xs-12 col-sm-7 col-md-8 col-lg-8">
                            <fieldset>
                            <div className="form-group">
                            <label htmlFor="project-title">Item Title</label>                            
                                <input 
                                    type="text" 
                                    id="project-title" 
                                    value={this.state.projectTitle}
                                    onChange={this.onTextChange}
                                    className="form-control"
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="short-desc">Short Description</label>
                                <textarea 
                                    id="short-desc"
                                    value={this.state.shortDesc}
                                    onChange={this.onTextChange}
                                    className="form-control grande"
                                    ></textarea>
                        </div>
                        <div className="form-group">
            
                            <label htmlFor="long-desc venti">Long Description</label>
                            <textarea 
                                id="long-desc"
                                value={this.state.longDesc}
                                onChange={this.onTextChange}
                                className="form-control venti"
                                ></textarea>
                        </div>
                        <div className="form-group">
            
                            <label htmlFor="tech-specs">Technologies Used</label>
                            <textarea 
                                id="tech-specs"
                                value={this.state.techSpecs}
                                onChange={this.onTextChange}
                                className="form-control grande"
                                ></textarea>
                        </div>                
                        <div className="form-group">
                            <label htmlFor="project-url">Project URL</label>
                                <input 
                                    type="text" 
                                    id="project-url" 
                                    onChange={this.onTextChange}
                                    value={this.state.projectUrl}
                                    className="form-control"
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="github-url">Github URL</label>
                                <input 
                                    type="text" 
                                    id="github-url" 
                                    onChange={this.onTextChange}
                                    value={this.state.githubUrl}
                                    className="form-control"
                                />
                        </div>
                        </fieldset>        
                        </Col>
                        <Col className="col-xs-12 col-sm-5 col-md-4 col-lg-4">  
                            <div className="form-group portfolio-imgs">

                                <Tabs defaultActiveKey="main-img" id="uncontrolled-tab-example">
                                    <Tab eventKey="main-img" title="Main Image">

                                        <div className="card bg-dark mb-3 text-center">
                                            {this.state.previewImg === '' && <p><br />No Main Image</p>}
                                            {this.state.previewImg.length > 0 && <div>
                                            <img src={this.state.previewImg} className="preview-img" />
                                            </div>}                        
                                        </div>
                                        <div className="form-group text-center">
                                            <PorfolioImageUploader 
                                                name="uploadImg"
                                                btnText = "Select Main Image"
                                                className="form-control"
                                                storageRef="portfolio"
                                                allowChooseImage={true}
                                                updateNewPreviewImgAdded={this.updateNewPreviewImgAdded}
                                                execPostFromUpload={this.state.execPostFromUpload}
                                                retrieveImgUrl={this.retrievePreviewImgUrl}
                                                doPostData={this.doPostData}
                                                onSubmit={this.doSubmit}
                                                showError={this.doErrorModal}
                                                showSuccess={this.showPreviewImgUploadSuccess}
                                            />                                            
                                        </div>                                    
                                    
                                    </Tab>
                                    {this.props.portfolioItem && 
                                    <Tab eventKey="aux-imgs" title="Slideshow">
                                        <div className="form-group text-center">
                                            <div className="aux-img-list-group card bg-dark mb-3">
                                                {this.state.auxImgs.length === 0 && <p><br />No Slideshow Images</p>}
                                                {this.state.auxImgs.length !== 0 && this.state.auxImgs.map((img, idx) => {
                                                    return (
                                                        <div key={uuid()} className="aux-img-list-item">
                                                            <div className="aux-img"><img src={img} /></div>
                                                            <div className="aux-img-btns"><Link to="#preview" className="badge badge-primary">Preview</Link> <Link to="#delete" data-idx={idx} onClick={this.doConfirmDelAuxImg} className="badge badge-danger">Delete</Link></div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="text-center">
                                        <PorfolioImageUploader 
                                            name="auxUploadImg"
                                            btnText = "Add Slideshow Image"
                                            className="form-control"
                                            allowChooseImage={false}
                                            storageRef="portfolio"
                                            retrieveImgUrl={this.retrieveAuxImgUrl}
                                            showError={this.doErrorModal}
                                            doPostData={this.doPostData}
                                            showSuccess={this.showAuxImgUploadSuccess}
                                        />                                                                   
                                        </div>
                                    </Tab>
                                    }
                                </Tabs>                            

                            
                            </div>

                            <div className="form-group">
                                <label>Select Portfolio Catgories:</label>
                                <div className="form-control port-cat-selects text-light">
                                    <PortCatSelect compareTo={this.state.portcats} onChange={this.handlePortCatSelect} />            
                                </div>
                            </div>
                            <div className="form-group">
                            <Button className="btn btn-success form-control" type="submit">{this.props.portfolioItem ? 'Update' :  'Create'} Portfolio Item</Button><br /><br />
                            <Button className="btn btn-primary form-control" onClick={this.doConfirmExit}>Back To Portfolio</Button>
                        </div>           
                        
                        </Col>
                    </Row>
                    </form>
                </div>
                </div>
            </Container>
        );
    
    }

}

export default PortfolioEditForm;

