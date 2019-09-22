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
        if(this.props.execPostFromUpload && (prevProps.execPostFromUpload !== this.props.execPostFromUpload)) {
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
            this.props.retrieveImgUrl(url);
        })
        .then(() =>{
            const {previousImg} = this.props;
            if(previousImg) {
                console.log('previousImg = ', previousImg)
                const imgNameRight = previousImg.split('%2F').pop(); // everything after %2f
                console.log('imgNameRight = ', imgNameRight)
                const imgName = imgNameRight.split('?').shift() // everything before ?
                // imgName should be 8wjseysfas-fkdfysdf3.jpg or something similar
                console.log(imgName);
                firebase
                .storage()
                .ref(this.props.storageRef)
                .child(imgName)
                .delete()
                .then(() => {
                    console.log(`## deleted ${imgName} from storage`);
                }).catch((err) => {
                    console.log(`Could not delete ${imgName} because of the following error:`, err);
                })
            }
        })
        .then(
            () => {
                this.props.doPostData();
            })
        .then(
            () => {
                this.props.showSuccess();
            });
    }
        
    handleChooseImage = (e) => {
        const files = e.target.files;
        let filesToStore = [];
        
        for(let i = 0; i < files.length; i++) {
            filesToStore.push(files[i]);
        }
        this.setState({ files: filesToStore });

        this.props.updateNewPreviewImgAdded(filesToStore[0])
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
            <div>
                {this.state.isUploading && 
                <div className="progress" style={{marginBottom: "10px", height:"0.2rem"}}>
                    <div className="progress-bar bg-success" role="progressbar" style={{width: `${this.state.progress}%`,  height:"0.2rem"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>}
                {!this.state.isUploading && <div style={{width: "100%", height: "0.2rem", marginBottom: "10px"}}></div>}
                <label className="btn btn-primary">{this.props.btnText}
                <FileUploader
                    ref={instance => { this.fileUploader = instance; } }
                    {...fbuProps}
                /></label>            
            </div>
        )
    }
}

export default PorfolioImageUploader;