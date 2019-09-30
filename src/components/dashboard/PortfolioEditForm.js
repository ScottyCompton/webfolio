import React from 'react';
import { firebase } from '../../firebase/firebase';
import { history } from '../../routers/AppRouter';
import moment from 'moment';
import PortCatSelect from './PortCatSelect';
import { camelCase } from 'lodash';
import { Link } from 'react-router-dom';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AdminMessageModal from './AdminMessageModal';
import uuid from 'uuid';
import ImageUploader from './ImageUploader';

class PortfolioEditForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.initState(props.portfolioItem)
    }


    initState(portfolioItem) {
        //const cso = this.setCsoArray(portfolioItem)
        //const isDirty = portfolioItem && portfolioItem.cso && csoArray.length !== portfolioItem.cso.length;
        return {
            projectTitle: portfolioItem ? portfolioItem.projectTitle : '',
            shortDesc: portfolioItem ? portfolioItem.shortDesc : '',
            longDesc: portfolioItem ? portfolioItem.longDesc : '',
            projectUrl: portfolioItem ? portfolioItem.projectUrl : '',
            techSpecs: portfolioItem ? portfolioItem.techSpecs : '',
            previewImg: portfolioItem ? portfolioItem.previewImg : '',
            auxImgs: portfolioItem && portfolioItem.auxImgs ? portfolioItem.auxImgs : [],
            githubUrl: portfolioItem ? portfolioItem.githubUrl : '',
            portcats: portfolioItem && portfolioItem.portcats ? portfolioItem.portcats : [],
            published: portfolioItem && portfolioItem.published ? portfolioItem.published : false,
            msgModal: {
                show: false,
                type: 'INFO',
                message: '',
                confirmBtnText: '',
                closeBtnText: '',
                onConfirm: undefined,
                onExitSave: undefined,
                dataIdx: undefined,
                onHide: this.closeMsgModal
            },
            isNew: !portfolioItem,
            newPreviewImgAdded: false,
            previousImg: undefined,
            previousAuxImg: undefined,
            modalConfirm: this.onExitConfirm,
            modalOnSaveExit: this.onSaveExit,
            lastUpdated: portfolioItem ? portfolioItem.lastUpdated : moment().valueOf(),
            createDate: portfolioItem ? portfolioItem.createDate : moment().valueOf(),
            isDirty: false,
            saveAndExit: false,
            cso: this.setCsoArray(portfolioItem)
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
        const cso = this.state.cso;
        const { checked, value } = e.target;

        // this is just a check against trash data, at lease during development


        cso.forEach((item, idx) => {
            if (item.catId === undefined || item.sortOrder === undefined) {
                cso.splice(idx, 1)
            }
        })

        if (checked) {
            // add the id to the portcats array
            portcats.push(value);

            // add to the cso array, make the sortOrder -1
            const csoIndex = this.state.cso.findIndex((item) => {
                return item.catId + '' === value + '';
            })

            if (csoIndex === -1) {
                cso.push({
                    catId: value,
                    sortOrder: -1
                })
            }
        } else {
            // remove the id from the portcats array
            portcats.splice(portcats.indexOf(value), 1);

            // add to the cso array, make the sortOrder -1
            const csoIndex = this.state.cso.findIndex((item) => {
                return item.catId + '' === value;
            })

            if (csoIndex !== -1) {
                cso.splice(csoIndex, 1)
            }

        }

        this.setState({
            portcats,
            cso,
            isDirty: true
        });

    }

    setCsoArray = (portfolioItem) => {

        // the only purpose to this function is to account for the fact
        // that the catId-sortOrder (cso) was added after the catId functionality
        // already existed, and to make sure that the relationship between catIds
        // and cso is sync'd.  This might not be necessary later...

        if(!portfolioItem || !portfolioItem.portcats || portfolioItem.portcats.length ===0) return [];
        const {cso=[], portcats=[]} = portfolioItem;
        
        portcats.forEach((catId) => {
            const csoIdx = cso.findIndex((thisCso) => {
                return catId + '' === thisCso.catId + ''
            })

            // didn't find this guy in the cso array, shove him in
            if (csoIdx === -1) {
                cso.push({
                    catId: catId,
                    sortOrder: -1
                })
            }
        })
        return cso;
    }


    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.projectTitle || !this.state.shortDesc) {
            // set error state - please provide a title and a description
            this.doErrorModal('You need to provide a title and a description.');
            return false;
        }

        if (!this.state.previewImg) {
            // set error state - add a preview image
            this.doErrorModal('You need to provide a main portfolio image.');
            return false;
        }

        if (!this.state.portcats || this.state.portcats.length === 0) {
            this.doErrorModal('At least one category is required');
            return false;
        }
        this.closeMsgModal();
        const saveAndExit = this.state.saveAndExit;
        if (!this.state.newPreviewImgAdded) {
            this.doPostData();
            if(!saveAndExit) {
                this.doSuccessModal('The portfolio entry was successfully saved');
            }
        } else {
            this.setState({
                execPostFromUpload: true,
                newPreviewImgAdded: false
            })
        }

        if(saveAndExit) {
            history.push('/dashboard/portfolio');
        }

    }


    // methods for the image upload component
    retrievePreviewImgUrl = (url) => {
        this.setState({
            previewImg: url
        })
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
        const previousImg = this.state.previewImg;
        this.setState({
            previousImg,
            previewImg: tmppath,
            isDirty: true,
            newPreviewImgAdded: true
        })
    }

    doErrorModal = (error) => {
        this.doMsgModal('ERROR', error);
    }

    doSuccessModal = (message) => {
        this.setState({
            msgModal: {
            message: message,
            type: 'SUCCESS',
            show: true,
            closeBtnText: 'OK',
            onConfirm:undefined,
            onHide: this.closeMsgModal,                
        }})
    }

    doInfoModal = (message) => {
        this.doMsgModal('INFO', message);
        
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
                    show: false
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
            cso: this.state.cso || [],
            lastUpdated: moment().valueOf(),
            published: this.state.published,
        });
        this.setState({
            execPostFromUpload: false,
            isDirty: false,
            previousImg: undefined
        })
    }


    doConfirmExit = (e) => {
        const isDirty = this.state.isDirty;
        if (isDirty) {
            this.setState({
                msgModal: {
                message: "You have unsaved changes.  Are you sure you want to exit?",
                type: 'INFO',
                show: true,
                closeBtnText: 'Cancel',
                onConfirm:this.onExitConfirm,
                onHide: this.closeMsgModal,     
                onExitSave: this.onSaveExit          
            }})
            
        } else {
            this.onExitConfirm(e);
        }
    }

    togglePublish = () => {
        this.setState({
            published: !this.state.published
        });
        setTimeout(() => {
            document.getElementById('btnSubmit').click();
        },500)
    }

    onSaveExit = () => {
        this.setState({
            saveAndExit: true
        })
        this.closeMsgModal();
        setTimeout(() => {
            document.getElementById('btnSubmit').click();
        },500);
        

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
        e.preventDefault();
        const idx = e.target.getAttribute('data-idx');
        const auxImgs = this.state.auxImgs;
        const previousAuxImg = auxImgs[idx];
        this.setState({
            previousAuxImg,
            msgModal: {
            message: 'Are you sure you want to delete this image?',
            type: 'INFODELETE',
            show: true,
            dataIdx: idx,
            confirmBtnText: 'Yes Delete It',
            closeBtnText: 'Cancel',
            onConfirm: this.handleDelAuxImg,
            onHide: this.handleCancelDelAuxImg,                
        }})
    }

    handleCancelDelAuxImg = (e) => {
        this.closeMsgModal();
    }


    handleDelAuxImg = (e) => {
        e.preventDefault();
        const { auxImgs } = this.state;
        const auxImgIdx = e.target.getAttribute('data-idx');
        const auxImgToDelete = auxImgs[auxImgIdx];
        
        if (auxImgToDelete) {
            const imgNameRight = auxImgToDelete.split('%2F').pop(); // everything after %2f
            const imgName = imgNameRight.split('?').shift() // everything before ?
            // imgName should be 8wjseysfas-fkdfysdf3.jpg or something similar
            firebase
                .storage()
                .ref('portfolio')
                .child(imgName)
                .delete()
                .then(() => {
                    console.log(`## deleted ${imgName} from storage`);
                }).catch((err) => {
                    console.log(`Could not delete ${imgName} because of the following error:`, err);
                })
        }
        // const { auxImgs } = this.state;
        // const auxImgIdx = e.target.getAttribute('data-idx');
        auxImgs.splice(auxImgIdx, 1)
        this.setState({
            auxImgs
        });
        this.doPostData();
        //this.handleCancelDelAuxImg(e);
        setTimeout(() => {
            this.doSuccessModal('Slideshow Image successfully removed');
        }, 500)

    }

    render() {


        return (
            <form id="form-portfolio" onSubmit={this.onSubmit}>
            <AdminMessageModal
                onHide={this.state.msgModal.onHide}
                show={this.state.msgModal.show}
                type={this.state.msgModal.type}
                message={this.state.msgModal.message}
                confirmBtnText={this.state.msgModal.confirmBtnText}
                closeBtnText={this.state.msgModal.closeBtnText}
                onConfirm={this.state.msgModal.onConfirm}
                onExitSave={this.state.msgModal.onExitSave}
                dataIdx={this.state.msgModal.dataIdx}
            />            
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding">
                        <h5 className="admin-page-title">{this.props.portfolioItem ? 'Edit Portfolio Item ' : 'Create New Portfolio Item'} 
                        {this.props.portfolioItem && <Link className="btn btn-secondary btn-small float-right" to="/dashboard/portfolio/create">Create New</Link>}
                        {this.props.portfolioItem && <Link className="btn btn-success btn-small float-right" style={{marginRight: "10px"}} target="_blank" to={`/portfolio/${this.props.portfolioItem.id}`}>View In Browser</Link>}
                        </h5>
                        
                    </div>
                </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-7 col-md-8 col-lg-8 card text-white bg-secondary mb-3">
                            <div className="card-body">
                                <fieldset>
                                <div className="form-group">
                                    <div className="float-right">
                                    {this.state.published && <div><span>This item is currently published </span><button type="button" className="btn btn-sm btn-danger" onClick={this.togglePublish}>Unpublish</button></div> }
                                    {!this.state.published && <div><span>This item is currently unpblished </span><button type="button" className="btn btn-sm btn-success" onClick={this.togglePublish}>Publish</button></div> }
                                    </div>
                                </div>
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
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-5 col-md-4 col-lg-4">

                            <div className="form-group portfolio-imgs">

                                <Tabs>
                                    <TabList>
                                        <Tab>Main Image</Tab>
                                        <Tab>Slideshow</Tab>
                                    </TabList>
                                    <TabPanel>
                                
                                    <div className="card bg-dark text-center">
                                        {this.state.previewImg === '' && <p><br />No Main Image</p>}
                                        {this.state.previewImg.length > 0 && <div>
                                            <img src={this.state.previewImg} className="preview-img" />
                                        </div>}
                                    </div>
                                    <div className="form-group text-center">
                                        <ImageUploader
                                            name="uploadImg"
                                            btnText="Select Main Image"
                                            className="form-control"
                                            storageRef="portfolio"
                                            previousImg={this.state.previousImg}
                                            allowChooseImage={true}
                                            updateNewPreviewImgAdded={this.updateNewPreviewImgAdded}
                                            execPostFromUpload={this.state.execPostFromUpload}
                                            retrieveImgUrl={this.retrievePreviewImgUrl}
                                            doPostData={this.doPostData}
                                            showError={this.doErrorModal}
                                            showSuccess={this.showPreviewImgUploadSuccess}
                                        />
                                    </div>
                                
                                </TabPanel>
                                {this.props.portfolioItem &&
                                    <TabPanel>
                                        <div className="form-group text-center">
                                            <div className="aux-img-list-group card bg-dark">
                                                {this.state.auxImgs.length === 0 && <p><br />No Slideshow Images</p>}
                                                {this.state.auxImgs.length !== 0 && this.state.auxImgs.map((img, idx) => {
                                                    return (
                                                        <div key={uuid()} className="aux-img-list-item">
                                                            <div className="aux-img"><img src={img} /></div>
                                                            <div className="aux-img-btns"><a href={img} target="_blank" className="badge badge-primary">Preview</a> <Link to="#delete" data-idx={idx} onClick={this.doConfirmDelAuxImg} className="badge badge-danger">Delete</Link></div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <ImageUploader
                                                name="auxUploadImg"
                                                btnText="Add Slideshow Image"
                                                className="form-control"
                                                allowChooseImage={false}
                                                previousImg={this.state.previousAuxImg}
                                                storageRef="portfolio"
                                                retrieveImgUrl={this.retrieveAuxImgUrl}
                                                showError={this.doErrorModal}
                                                doPostData={this.doPostData}
                                                showSuccess={this.showAuxImgUploadSuccess}
                                            />
                                        </div>
                                    </TabPanel>
                                }
                                </Tabs>

                            </div>
                            <div><p>&nbsp;</p></div>
                            <div className="form-group">
                                <label>Select Portfolio Catgories:</label>
                                <div className="form-control port-cat-selects text-light">
                                    <PortCatSelect compareTo={this.state.portcats} onChange={this.handlePortCatSelect} />
                                </div>
                            </div>
                            <div className="form-group">
                                <button id="btnSubmit" className="btn btn-success form-control" type="submit">{this.props.portfolioItem ? 'Update' : 'Create'} Portfolio Item</button><br /><br />
                                <button className="btn btn-primary form-control" type="button" onClick={this.doConfirmExit}>Back To Portfolio</button>
                            </div>


                        </div>
                    </div>
            </div>
            </form>
        );

    }

}

export default PortfolioEditForm;

