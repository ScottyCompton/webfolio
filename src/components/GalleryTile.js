import React, {useState} from 'react';
import ImageWithPreloader from './ImageWithPreloader';
import uuid from 'uuid';

const GalleryTile = (props) => {
    const {handleClick, src} = props;


    return (                                                
        <div className="Gallery-Tile"  onClick={handleClick} className="Portfolio-Item__Gallery-Img">
            <div><ImageWithPreloader src={src} /></div>
        </div>
    )
}

export default GalleryTile;
