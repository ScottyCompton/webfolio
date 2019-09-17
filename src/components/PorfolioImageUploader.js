import React from 'react';
import { firebase } from '../firebase/firebase';
import FileUploader from 'react-firebase-file-uploader';



class PorfolioImageUploader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isUploading: false,
            progress: 0,
            uploadImg: '',
            files: []
        };
    }

    componentDidUpdate(prevProps) {
        if((prevProps.execPostFromUpload !== this.props.execPostFromUpload) && this.props.execPostFromUpload) {
            const {files} = this.state;

            if (files.length !== 0) {
                files.forEach(file => {
                this.fileUploader.startUpload(file)
                });            
            }
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
      this.props.showError(error);
    }


    handleUploadSuccess = (filename) => {
      this.setState(
          { uploadImg: filename, 
            progress: 100, 
            isUploading: false 
        });
      firebase
        .storage()
        .ref(this.props.storageRef)
        .child(filename)
        .getDownloadURL()
        .then((url) => {
            //this.setState({ previewImg: url })
            console.log('UPLOAD URL', url);
            this.props.retrieveImgUrl(url);
        })
        .then(
            () => {
                //this.doPostData();
                this.props.doPostData();
            })
        .then(
            () => {
                this.props.showSuccess();
                //this.doMsgModal('The portfolio entry was successfully saved');
            });
    }
        
    handleChooseImage = (e) => {
        const files = e.target.files;
        let filesToStore = [];
        
        for(let i = 0; i < files.length; i++) {
            filesToStore.push(files[i]);
        }
        this.setState({ files: filesToStore });
        this.props.updateNewPreviewImgAdded()
      }


    render() {

        const fbuProps = {
            accept: 'image/*',
            name: this.props.name,
            className: this.props.className,
            randomizeFilename: true,
            hidden: true,
            storageRef: firebase.storage().ref(this.props.storageRef),
            onUploadStart: this.handleUploadStart,
            onUploadError: this.handleUploadError,
            onUploadSuccess: this.handleUploadSuccess,
            onProgress: this.handleProgress
        }

        if(this.props.allowChooseImage) {
            fbuProps.onChange = this.handleChooseImage 
        }

        return (
            <label className="btn btn-primary">{this.props.btnText}
            <FileUploader
                ref={instance => { this.fileUploader = instance; } }
                {...fbuProps}
            /></label>            
        )
    }
}

export default PorfolioImageUploader;