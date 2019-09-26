import React from 'react';
import PreloadImage from 'components/PreloadImage';


const ImageWithPreloader = (props) => {
    const {src, className = 'img-peloader', duration = '1000ms' } = props;

    return (
        <PreloadImage 
            src={src}
            className={className}
            duration={duration}
            lazy
        />
    )

}

export default ImageWithPreloader;

