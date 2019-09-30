import React from 'react';
import { connect } from 'react-redux';
import { startUpdateSiteSettings } from '../../actions/site-settings';
import { camelCase } from 'lodash';
import AdminMessageModal from './AdminMessageModal';
import ImageUploader from './ImageUploader';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import uuid from 'uuid';
import { Link } from 'react-router-dom';
import { firebase } from '../../firebase/firebase';




class SiteSettingsEditForm extends React.Component {
    constructor(props) {
        super(props)

        const settings = props.siteSettings;

        this.state = {
            siteTitle: settings.siteTitle ? settings.siteTitle : 'Webfolio',
            aboutTitle: settings.aboutTitle ? settings.aboutTitle : 'About Me',
            aboutBlurb: settings.aboutBlurb ? settings.aboutBlurb : '',
            aboutImg: settings.aboutImg ? settings.aboutImg : '',
            resumeUrl: settings.resumeUrl ? settings.resumeUrl : '',
            facebookId: settings.facebookId ? settings.facebookId : '',
            twitterHandle: settings.twitterHandle ? settings.twitterHandle : '',
            linkedinUsername: settings.linkedinUsername ? settings.linkedinUsername : '',
            instagramId: settings.instagramId ? settings.instagramId : '',
            youtubeId: settings.youtubeId ? settings.youtubeId : '',
            contactPhone: settings.contactPhone ? settings.contactPhone : '',
            contactEmail: settings.contactEmail ? settings.contactEmail : '',
            githubId: settings.githubId ? settings.githubId : '',
            stackOverflowId: settings.stackOverflowId ? settings.stackOverflowId : '',
            newAboutImgAdded: false,
            sliderImgs: settings.sliderImgs ? settings.sliderImgs : [],
            msgModal: {
                show: false,
                type: 'INFO',
                message: '',
                confirmBtnText: '',
                closeBtnText: '',
                onConfirm: undefined,
                onHide: undefined
            },
            execPostFromUpload: false,
            previousAboutImg: undefined,
            isDirty: false,
            slideOrientation: 'portrait'
        }
    }


    retrievePreviewImgUrl = (url) => {
        this.setState({
            aboutImg: url
        }
        )
    }


    retrieveSliderImgUrl = (url) => {
        const sliderImgs = this.state.sliderImgs;
        const sortOrder = sliderImgs.length;
        sliderImgs.push({
            id: uuid(),
            src: url,
            sortOrder: sortOrder,
            isForeground: false,
            orientation: this.state.slideOrientation
            
        });
        this.setState({ sliderImgs: sliderImgs })
    }

    setSliderImgOrientation = () => {
        const orientation = this.state.slideOrientation;
        this.setState({
            slideOrientation: orientation === 'portrait' ? 'landscape' : 'portrait'
        })
    }

    // sets an image to the foreground of the slider
    handleRdoForegroundClick = (e) => {
        const id = e.target.id;
        const {sliderImgs} = this.state;
        
        // set the current one checked, all others wil be unchecked.
        sliderImgs.forEach((img) => {
            if(img.id === id) {
                img.isForeground = true;
            } else {
                if(img.orientation === this.state.slideOrientation) {
                    img.isForeground = false;
                }    
            }
        });

        this.setState({
            sliderImgs
        })
        
    }


    showSliderImgUploadSuccess = () => {
        this.doSuccessModal('Slider Image successfully added to portfolio');
    }


    // open the modal window to confirm 
    // user wants to delete the selected slide image

    showDeleteSliderImgModal = (e) => {     

        // get the id of the image to frag
        const imgToDeleteId = e.target.getAttribute('data-id');

        // setup the modal window
        this.setState({
            imgToDeleteId,
            msgModal: {
                message: 'Are you sure you want to delete this slider image?',
                type: 'INFODELETE',
                show: true,
                confirmBtnText: 'Yes Delete It',
                closeBtnText: 'Cancel',
                onConfirm: this.handleDelSliderImg,
                onHide: this.doCancelDelSliderImg,                
            }
        });
    }


    // what happens when the user cancels deleting a slider image
    doCancelDelSliderImg = (e) => {
        //this.closeMsgModal();
        this.setState({
            msgModal: {
                show: false
            }
        });
    }



    // what happens when the user confirms deleting the slider image
    handleDelSliderImg = () => {
        const { imgToDeleteId, sliderImgs } = this.state

        const imgIdx = sliderImgs.findIndex((img) => {
            return img.id = imgToDeleteId;
        });

        const imgToDelete = sliderImgs[imgIdx].src;

        if (imgToDelete) {
            const imgNameRight = imgToDelete.split('%2F').pop(); // everything after %2f
            const imgName = imgNameRight.split('?').shift() // everything before ?
            // imgName should be 8wjseysfas-fkdfysdf3.jpg or something similar
            firebase
                .storage()
                .ref('settings')
                .child(imgName)
                .delete()
                .then(() => {
                    console.log(`## deleted ${imgName} from storage`);
                    sliderImgs.splice(imgIdx, 1)
                    this.setState({
                        sliderImgs
                    });
                    this.doPostData();
                    setTimeout(() => {
                        this.doSuccessModal('Slider Image successfully removed');
                    }, 500)
                    
                }).catch((err) => {
                    console.log(`Could not delete ${imgName} because of the following error:`, err);
                })
        }


    }


    updateNewAboutImgAdded = (newFile) => {
        const tmppath = (window.URL || window.webkitURL).createObjectURL(newFile);
        const previousImg = this.state.aboutImg;
        this.setState({
            previousImg,
            aboutImg: tmppath,
            isDirty: true,
            newAboutImgAdded: true
        })
    }


    onTextChange = (e) => {
        let stateObj = {
            isDirty: true
        };
        const fldName = camelCase(e.target.id);
        stateObj[fldName] = e.target.value;
        this.setState(stateObj);
    }

    doInfoModal = (message) => {
        this.doMsgModal('INFO', message);
        
    }


    doMsgModal = (type, message) => {
        this.setState({
            msgModal: {
                type,
                message,
                show: true,
                onHide: this.closeMsgModal
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

    doErrorModal = (error) => {
        this.doMsgModal('ERROR', error);
    }

    doSuccessModal = (message) => {
        this.doMsgModal('SUCCESS', message);
    }

    showPreviewImgUploadSuccess = () => {
        this.doSuccessModal('Site settings have been saved');
    }


    onSubmit = (e) => {
        e.preventDefault();
        // error checking here 

        this.closeMsgModal();

        if (!this.state.newAboutImgAdded) {
            this.doPostData();
            this.doSuccessModal('Site settings have been saved');
        } else {
            this.setState({
                execPostFromUpload: true,
                newAboutImgAdded: false
            })
        }
    }


    doPostData = () => {
        this.props.startUpdateSiteSettings({
            siteTitle: this.state.siteTitle,
            aboutTitle: this.state.aboutTitle,
            aboutBlurb: this.state.aboutBlurb,
            aboutImg: this.state.aboutImg,
            resumeUrl: this.state.resumeUrl,
            facebookId: this.state.facebookId,
            twitterHandle: this.state.twitterHandle,
            linkedinUsername: this.state.linkedinUsername,
            instagramId: this.state.instagramId,
            youtubeId: this.state.youtubeId,
            contactPhone: this.state.contactPhone,
            contactEmail: this.state.contactEmail,
            githubId: this.state.githubId,      
            sliderImgs: this.state.sliderImgs      
        });
        this.setState({
            execPostFromUpload: false,
            isDirty: false,
            previousAboutImg: undefined
        })        
    }



    render() {

        const sliderImgs = this.state.sliderImgs.filter((img) => {
            return img.orientation === this.state.slideOrientation
        })

        return (
            <div className="container">
                <AdminMessageModal
                    onHide={this.state.msgModal.onHide}
                    show={this.state.msgModal.show}
                    type={this.state.msgModal.type}
                    message={this.state.msgModal.message}
                    confirmBtnText={this.state.msgModal.confirmBtnText}
                    closeBtnText={this.state.msgModal.closeBtnText}
                    onConfirm={this.state.msgModal.onConfirm}
                />
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <h5 className="admin-page-title">Site Settings</h5>
                    </div>
                </div>

                <form id="form-settings" onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-xs-12 col-sm-7 col-md-8 col-lg-8">

                            <div className="card text-white bg-secondary mb-3">
                                <div className="card text-white bg-secondary mb-3">
                                    <div className="card-body">
                                        <fieldset>
                                            <div className="form-group">
                                                <label htmlFor="site-title">Site Title</label>
                                                <input
                                                    type="text"
                                                    id="site-title"
                                                    value={this.state.siteTitle}
                                                    onChange={this.onTextChange}
                                                    className="form-control"
                                                />
                                            </div>
                                        </fieldset>

                                        <fieldset>
                                            <h5 className="admin-page-subtitle">About Information</h5>

                                            <div className="form-group">
                                                <label htmlFor="about-title">About Title</label>
                                                <input
                                                    type="text"
                                                    id="about-title"
                                                    value={this.state.aboutTitle}
                                                    onChange={this.onTextChange}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="about-blurb">About Blurb</label>
                                                <textarea
                                                    id="about-blurb"
                                                    value={this.state.aboutBlurb}
                                                    onChange={this.onTextChange}
                                                    className="form-control"
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="contact-phone">Contact Phone</label>
                                                <input
                                                    id="contact-phone"
                                                    type="text"
                                                    value={this.state.contactPhone}
                                                    onChange={this.onTextChange}
                                                    className="form-control"
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="contact-phone">Contact Email</label>
                                                <input
                                                    id="contact-email"
                                                    type="text"
                                                    value={this.state.contactEmail}
                                                    onChange={this.onTextChange}
                                                    className="form-control"
                                                />
                                            </div>


                                            <div className="form-group">
                                                <label htmlFor="resume-url">Resume URL</label>
                                                <input
                                                    id="resume-url"
                                                    type="text"
                                                    value={this.state.resumeUrl}
                                                    onChange={this.onTextChange}
                                                    className="form-control"
                                                />
                                            </div>



                                        </fieldset>

                                        <fieldset>
                                            <h5 className="admin-page-subtitle">Social Media</h5>

                                            <div className="row">
                                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                                    <div className="form-group">
                                                        <label htmlFor="facebook-id">Facebook ID</label>
                                                        <input
                                                            type="text"
                                                            id="facebook-id"
                                                            value={this.state.facebookId}
                                                            onChange={this.onTextChange}
                                                            className="form-control"
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="twitter-handle">Twitter Handle</label>
                                                        <input
                                                            type="text"
                                                            id="twitter-handle"
                                                            value={this.state.twitterHandle}
                                                            onChange={this.onTextChange}
                                                            className="form-control"
                                                        />
                                                    </div>


                                                    <div className="form-group">
                                                        <label htmlFor="linkedin-username">LinkedIn Username</label>
                                                        <input
                                                            type="text"
                                                            id="linkedin-username"
                                                            value={this.state.linkedinUsername}
                                                            onChange={this.onTextChange}
                                                            className="form-control"
                                                        />
                                                    </div>                                                
                                                
                                                </div>
                                                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">


                                                    <div className="form-group">
                                                        <label htmlFor="instagram-id">InstaGram ID</label>
                                                        <input
                                                            type="text"
                                                            id="instagram-id"
                                                            value={this.state.instagramId}
                                                            onChange={this.onTextChange}
                                                            className="form-control"
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="youtube-id">YouTube ID</label>
                                                        <input
                                                            type="text"
                                                            id="youtube-id"
                                                            value={this.state.youtubeId}
                                                            onChange={this.onTextChange}
                                                            className="form-control"
                                                        />
                                                    </div>


                                                    <div className="form-group">
                                                        <label htmlFor="github-id">Github ID</label>
                                                        <input
                                                            type="text"
                                                            id="github-id"
                                                            value={this.state.githubId}
                                                            onChange={this.onTextChange}
                                                            className="form-control"
                                                        />
                                                    </div>                                                

                                                </div>

                                                
                                            </div>
                                            



                                        </fieldset>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-xs-12 col-sm-5 col-md-4 col-lg-4">

                            <Tabs>
                                <TabList>
                                    <Tab>About Image</Tab>
                                    <Tab>Hero Slider</Tab>
                                </TabList>
                                <TabPanel>
                                    <div className="card bg-dark text-center">
                                        {this.state.aboutImg === '' && <p><br />No About Image</p>}
                                        {this.state.aboutImg.length > 0 && <div>
                                            <img src={this.state.aboutImg} className="about-img" />
                                        </div>}
                                    </div>
                                    <div className="form-group text-center">
                                        <ImageUploader
                                            name="aboutImg"
                                            btnText="Select About Image"
                                            className="form-control"
                                            storageRef="settings"
                                            previousAboutImg={this.state.previousAboutImg}
                                            allowChooseImage={true}
                                            updateNewPreviewImgAdded={this.updateNewAboutImgAdded}
                                            execPostFromUpload={this.state.execPostFromUpload}
                                            retrieveImgUrl={this.retrievePreviewImgUrl}
                                            doPostData={this.doPostData}
                                            showError={this.doErrorModal}
                                            showSuccess={this.showPreviewImgUploadSuccess}
                                        />
                                    </div>
                                </TabPanel>

                                <TabPanel>
                                    <div className="form-group text-center">
                                        <div className="slider-img-list-group card bg-dark">
                                            <div style={{height: "30px"}}>
                                                <div className="slider-img-orientation">
                                                    {this.state.slideOrientation === 'portrait' && <div onClick={this.setSliderImgOrientation} className="slider-img-orientation-portrait bg-primary">&nbsp;</div>}
                                                    {this.state.slideOrientation === 'landscape' && <div onClick={this.setSliderImgOrientation} className="slider-img-orientation-landscape bg-primary">&nbsp;</div>}
                                                </div>                                            
                                            </div>

                                            <div>
                                                {sliderImgs.length === 0 && <p><br />No {this.state.slideOrientation} images</p>}
                                                {   
                                                    sliderImgs.map((img) => {
                                                        return (
                                                            <div key={uuid()} className="slider-img-list-item">
                                                                <div className="slider-img-check"> <input type="radio" name={`rdoIsForeground_${img.orientation}`} defaultChecked={img.isForeground} id={img.id} onChange={this.handleRdoForegroundClick} /></div>
                                                                <div className={`slider-img slider-img--${this.state.slideOrientation}`}><img src={img.src} /></div>
                                                                <div className="slider-img-btns"><a href={img.src} target="_blank" className="badge badge-primary">Preview</a> <Link to="#delete" data-id={img.id} onClick={this.showDeleteSliderImgModal} className="badge badge-danger">Delete</Link></div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <ImageUploader
                                            name="sliderUploadImg"
                                            btnText="Add Slideshow Image"
                                            className="form-control"
                                            allowChooseImage={false}
                                            previousImg={this.state.previousAuxImg}
                                            storageRef="settings"
                                            retrieveImgUrl={this.retrieveSliderImgUrl}
                                            showError={this.doErrorModal}
                                            doPostData={this.doPostData}
                                            showSuccess={this.showSliderImgUploadSuccess}
                                        />
                                    </div>
                                </TabPanel>
                            </Tabs>
                            <div>
                                <p>&nbsp;</p>
                            </div>

                            <div className="form-group">
                                <button className="btn btn-success form-control" type="submit">Update Settings</button><br /><br />
                            </div>

                        </div>
                    </div>
                </form>
            </div>

        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        siteSettings: state.siteSettings
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        startUpdateSiteSettings: (updates) => dispatch(startUpdateSiteSettings(updates))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteSettingsEditForm);