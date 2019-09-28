import React, {useState} from 'react';
import ImageWithPreloader from './ImageWithPreloader';
import uuid from 'uuid';

const GalleryTile = (props) => {
    const {handleClick, src, idx} = props;

    const doHandleClick = () => {
        handleClick(idx);
    }


    return (                                                
        <div className="Gallery-Tile" onClick={doHandleClick} className="Portfolio-Item__Gallery-Img">
            <div><ImageWithPreloader src={src} /></div>
        </div>
    )
}

export default GalleryTile;
