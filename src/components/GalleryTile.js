import React, {useState} from 'react';
import ImageWithPreloader from './ImageWithPreloader';
import uuid from 'uuid';

const GalleryTile = (props) => {
    const {handleClick, src, idx, auxImgAspectRatio} = props;

    const doHandleClick = (e) => {
        handleClick(e,idx);
    }


    return (                                                
        <div className="Gallery-Tile" onClick={doHandleClick} className="Portfolio-Item__Gallery-Img">
            <div><ImageWithPreloader style={{paddingTop: `${auxImgAspectRatio}%`}} src={src} className="Portfolio-Item__img-preloader" /></div>
        </div>
    )
}

export default GalleryTile;
