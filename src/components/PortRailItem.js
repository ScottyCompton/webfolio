import React, { useState, useContext } from 'react';
import ImageWithPreloader from './ImageWithPreloader';
import { Link } from 'react-router-dom';
import {loadLightbox, showLightbox} from '../actions/portfolio-item-lightbox';
import { connect } from 'react-redux';


class PortRailItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            infoClass: ''
        }

    }


 

    handleMouseEnter = (e) => {
        this.setState({
            infoClass: 'railItem__info--expanded'}
        );
    }

    handleMouseLeave = (e) => {
        this.setState({
            infoClass: ''}
        );
    }

    handleLinkClick = (e) => {
        e.target.blur();
    }

    handleCloseWindowClick = (e) => {
        this.setState({
            infoClass: ''
        })
    }

    handleViewDetailsClick = (e) => {
        e.preventDefault();
        this.props.loadLightbox(this.props.data);
        document.querySelector('body').classList.add('no-scroll')
        setTimeout(() => {
            this.props.showLightbox();
        }, 500)
    }

    render() {
        const {projectTitle, shortDesc, propcats, previewImg, techSpecs, projectUrl, auxImgs} = this.props.data;    
        const hasAuxImgs = auxImgs && auxImgs.length > 0;
        const hasDetails = hasAuxImgs || projectUrl;


        return (
            <span>
                <div className="railItem__outer" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    <div className="railItem__inner">
                        <div onClick={this.handleMouseEnter}>
                            <ImageWithPreloader src={previewImg} className="railitem__img-preloader" />
                        </div>
                        <div className={`railItem__info ${this.state.infoClass}`}>
                            <h5>{projectTitle}</h5>
                            <div className={`railItem__info--short-desc ${this.state.infoClass}`}>
                                {shortDesc}
                                {techSpecs && <div><br />Technologies Used:<br /> {techSpecs}</div>}
                                {hasDetails &&
                                    <div className="railItem__info--buttons">
                                            {projectUrl && <span className="show-for-mobile"><a className="btn btn-outline-warning" onClick={this.handleLinkClick} href={projectUrl} target="_blank">Visit Website</a></span>}
                                            {hasAuxImgs && <span className="show-for-mobile"><button className="btn btn-outline-warning" onClick={this.handleViewDetailsClick}>View Details</button></span>}
                                            {projectUrl && <span className="show-for-desktop"><a className="btn btn-outline-warning btn-sm" onClick={this.handleLinkClick} href={projectUrl} target="_blank">Visit Website</a></span>}
                                            {hasAuxImgs && <span className="show-for-desktop"><button className="btn btn-outline-warning btn-sm" onClick={this.handleViewDetailsClick}>View Details</button></span>}
                                    </div>                            
                                }
                                <div className="show-for-mobile railitem_close-button"><button className="btn btn-outline-warning" onClick={this.handleCloseWindowClick}> Close </button></div>
                             </div>    
                        </div>
                    </div>
                </div>
            </span>
        )        
    }
}


const mapDispatchToProps = (dispatch) =>{
    return {
        loadLightbox: (portfolioItem) => dispatch(loadLightbox(portfolioItem)),
        showLightbox: () => dispatch(showLightbox()) 
    }
}

export default connect(undefined, mapDispatchToProps)(PortRailItem);

