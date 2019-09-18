import React from 'react';
import PreloadImage from 'react-preload-image';


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



// import React from 'react';
// import Img from 'react-image';
// import VisibilitySensor from 'react-visibility-sensor'


// const ImageWithPreloader = (props) => {
//     const {src, className = 'img-peloader', duration = '1000ms' } = props;

//     const preLoader = () => {
//         return (<div className="railitem__img-preloader">
//                 </div>)
//     }

//     return (
//         <VisibilitySensor>
//             <Img 
//                 src={src}
//                 loader={preLoader()}
//             />
//         </VisibilitySensor>
//     )

// }

// export default ImageWithPreloader;




// import React from 'react';
// import PreloadImage from 'react-preload-image';


// const ImageWithPreloader = (props) => {
//     const {src, className = 'img-peloader', duration = '1000ms' } = props;

//     return (
//         <PreloadImage 
//             src={src}
//             className={className}
//             duration={duration}
//             lazy
//         />
//     )

// }

// export default ImageWithPreloader;