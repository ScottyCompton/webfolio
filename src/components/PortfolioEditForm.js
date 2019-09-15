import React from 'react';
import { firebase } from '../firebase/firebase';
import FileUploader from 'react-firebase-file-uploader';
import moment from 'moment';
import PortCatSelect from './PortCatSelect';
import {camelCase} from 'lodash';
import { Link } from 'react-router-dom';
import {Container,  Row, Col } from 'react-bootstrap'

class PortfolioEditForm extends React.Component {

    constructor(props) {
        super(props);


        const {portfolioItem} = props;
        this.state = {
            projectTitle: portfolioItem ? portfolioItem.projectTitle : '',
            shortDesc: portfolioItem ? portfolioItem.shortDesc : '',
            longDesc: portfolioItem ? portfolioItem.longDesc : '',            
            projectUrl: portfolioItem ? portfolioItem.projectUrl : '',
            techSpecs:  portfolioItem ? portfolioItem.techSpecs : '',
            previewImg: portfolioItem ? portfolioItem.previewImg : '',
            githubUrl:  portfolioItem ? portfolioItem.githubUrl : '',
            portcats:  portfolioItem && portfolioItem.portcats ? portfolioItem.portcats : [],
            uploadImg: '',
            files: [],
            error: '',
            isUploading: false,
            lastUpdated: portfolioItem ? portfolioItem.lastUpdated : moment().valueOf(),
            createDate: portfolioItem ? portfolioItem.createDate : moment().valueOf()
        }
    }



    handleUploadStart = () => {
        this.setState({ isUploading: true, progress: 0 });
    }
    
    handleProgress = (progress) => {
        this.setState({ progress });
    }
    
    handleUploadError = error => {
      this.setState({ isUploading: false });
      this.setState({error});
    }


    handleUploadSuccess = (filename) => {
      this.setState(
          { uploadImg: filename, 
            progress: 100, 
            isUploading: false 
        });
      firebase
        .storage()
        .ref("portfolio")
        .child(filename)
        .getDownloadURL()
        .then((url) => {
            this.setState({ previewImg: url })
        })
        .then(
            () => {
                this.doPostData();
            });
    };

    onTextChange = (e) => {
        let stateObj = {};
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
            portcats
        });
    }

    handleChooseImage = (e) => {
        const { target: { files } } = e;
        const filesToStore = [];
        for(let i = 0; i < files.length; i++) {
            filesToStore.push(files[i])
        }
        this.setState({ files: filesToStore });
      }


    onSubmit = (e) => {
        e.preventDefault();

        if(!this.state.projectTitle || !this.state.shortDesc) {
            // set error state - please provide a title and a description
            this.setState(() => ({error: "please provide a title and a description."}));
            return false;
        }

        if(!this.state.portcats || this.state.portcats.length === 0) {
            this.setState(() => ({error: "at least one category is required"}));
            return false;
        }

        this.setState(() => ({error: ""}));
        const {files} = this.state;

        if (files.length !== 0) {
            files.forEach(file => {
              this.fileUploader.startUpload(file)
            });                
        } else {
            this.doPostData();
        }

        
        
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
            lastUpdated: moment().valueOf()
        })
    }



    render() {
        return (
            <Container className="card text-white bg-secondary mb-3">
                {this.state.error && <p className="form__error">{this.state.error}</p>}

                <form id="form-portfolio"  onSubmit={this.onSubmit}>
                <Row>
                    <Col className="col-xs-6 col-sm-7 col-md-8 col-lg-8">
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
                    <div className="form-group">
                        <button type="submit">{this.props.portfolioItem ? 'Update' :  'Create'} Item</button>

                        <Link to="/dashboard/portfolio">Back To Portfolio</Link>
                    </div>           
                    </fieldset>        
                    </Col>
                    <Col className="col-xs-6 col-sm-5 col-md-4 col-lg-4">                        
                        <div className="text-center">
                            <label>Preview Image </label>
                            {this.state.previewImg.length > 0 && <div>
                                <img src={this.state.previewImg} className="preview-img" />
                            </div>}                        
                        </div>
                        <div>&nbsp;</div>
                        <div className="form-group text-center">
                            <label className="btn btn-primary">Select Preview Image: 
                            <FileUploader
                                accept="image/*"
                                name="uploadImg"
                                randomizeFilename
                                ref={instance => { this.fileUploader = instance; } }
                                storageRef={firebase.storage().ref("portfolio")}
                                onChange={this.handleChooseImage}
                                className="form-control"
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                                onProgress={this.handleProgress}
                                hidden
                            /></label>
                        </div>
                        <div className="form-group">
                            <label>Select Portfolio Catgories:</label>
                            <div className="form-control port-cat-selects text-light">
                                <PortCatSelect compareTo={this.state.portcats} onChange={this.handlePortCatSelect} />            
                            </div>
                        </div>
                    
                    </Col>
                </Row>
                </form>
            </Container>
        );
    
    }

}

export default PortfolioEditForm;