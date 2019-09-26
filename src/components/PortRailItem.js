import React, { useState } from 'react';
import ImageWithPreloader from './ImageWithPreloader';
import { Link } from 'react-router-dom';

const PortRailItem = (props) => {

    const [infoClass, setInfoClass] = useState('');
    const {id, projectTitle, shortDesc, propcats, previewImg, techSpecs, projectUrl, auxImgs} = props.data;    
    const hasAuxImgs = auxImgs && auxImgs.length > 0;
    const hasDetails = hasAuxImgs || projectUrl;

    const handleMouseEnter = (e) => {
        setInfoClass('railItem__info--expanded');
    }

    const handleMouseLeave = (e) => {
        setInfoClass('');
    }

    const handleLinkClick = (e) => {
        e.target.blur();
    }

	
	const handleCloseWindowClick = (e) => {
		setInfoClass('');
	}

        return (
            <span>
                <div className="railItem__outer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <div className="railItem__inner">
                        <div onClick={handleMouseEnter}>
                            <ImageWithPreloader src={previewImg} className="railitem__img-preloader" />
                        </div>
                        <div className={`railItem__info ${infoClass}`}>
                            <h5>{projectTitle}</h5>
                            <div className={`railItem__info--short-desc ${infoClass}`}>
                                {shortDesc}
                                {techSpecs && <div><br />Technologies Used:<br /> {techSpecs}</div>}
                                {hasDetails &&
                                    <div className="railItem__info--buttons">
                                            {projectUrl && <span className="show-for-mobile"><a className="btn btn-outline-warning" onClick={handleLinkClick} href={projectUrl} target="_blank">Visit Website</a></span>}
                                            {hasAuxImgs && <span className="show-for-mobile"><Link className="btn btn-outline-warning" to={`/portfolio/${id}`}>View Details</Link></span>}
                                            {projectUrl && <span className="show-for-desktop"><a className="btn btn-outline-warning btn-sm" onClick={handleLinkClick} href={projectUrl} target="_blank">Visit Website</a></span>}
                                            {hasAuxImgs && <span className="show-for-desktop"><Link className="btn btn-outline-warning btn-sm" to={`/portfolio/${id}`}>View Details</Link></span>}
                                    </div>                            
                                }
                                <div className="show-for-mobile railitem_close-button"><button className="btn btn-outline-warning" onClick={handleCloseWindowClick}> Close </button></div>
                             </div>    
                        </div>
                    </div>
                </div>
            </span>
        )        
    
}


export default PortRailItem;

