import  React, { useState } from 'react';
import ImageWithPreloader from './ImageWithPreloader';

const PortRailItem = (props) => {
    const {projectTitle, shortDesc, propcats, previewImg} = props.data;
    const [infoClass, setInfoClass] = useState('');


    const handleMouseEnter = (e) => {
        setInfoClass('railItem__info--expanded');
    }

    const handleMouseLeave = (e) => {
        setInfoClass('');
    }

    return (
        <div>
            <div className="railItem__outer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="railItem__inner">
                    <ImageWithPreloader src={previewImg} className="railitem__img-preloader" />
                    <div className={`railItem__info ${infoClass}`}>
                        <h5>{projectTitle}</h5>
                        <div className={`railItem__info--short-desc ${infoClass}`}>
                        {shortDesc}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PortRailItem;

