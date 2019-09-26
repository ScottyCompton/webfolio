import React, {useState} from 'react'
import uuid from 'uuid';
import Slider from 'react-slick';
import ReactModal from 'react-modal';
import SliderArrow from './SliderArrow';
import { connect } from 'react-redux';
import { hidePortfolioItemLightbox } from 'actions/portfolio-item-lightbox';


const PortItemLightox = (props) => {
    const {lightbox, handleClose} = props;
    const {portfolioItem = {}, isOpen} = lightbox;

    const {
        auxImgs = [], 
        projectTitle = '', 
        shortDesc = '', 
        longDesc = '', 
        githubUrl = '', 
        projectUrl= '',
    } = portfolioItem;

    const modalClassNames = {
        modalContent: {
          base: "PILightbox__Content",
          afterOpen: "PILightbox__Content--after-open",
          beforeClose: "PILightbox__Content--before-close"
        },
        modalOverlay: {
          base: "PILightbox__Overlay",
          afterOpen: "PILightbox__Overlay--after-open",
          beforeClose: "PILightbox__Overlay--before-close"
        }
      };
    

      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        ladyLoad: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        centerPadding: "60px",
        arrows: true,
        nextArrow: <SliderArrow type='next' />,
        prevArrow: <SliderArrow type='prev' />,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    centerMode: false
                }
            },
            {
                breakpoint: 32767,
                settings: {
                    centerMode: true
                }
            }                
        ]
    }

    const handleClickClose = () => {
        props.hidePortfolioItemLightbox();
    }

    return (
        <ReactModal
        isOpen={isOpen}
        contentLabel={projectTitle}
        className={modalClassNames.modalContent}
        overlayClassName={modalClassNames.modalOverlay}
        closeTimeoutMS={200}
      >
        {isOpen && auxImgs.length > 0 && 
            <div>
                <button style={{marginTop: "40px"}} onClick={handleClickClose}>Kill me</button>
                <Slider {...settings}>
                {auxImgs.map((item) => {
                    return (
                        <img  key={uuid()} src={item} />
                    )
                })}
                </Slider>      
            </div>          
            }
        
    </ReactModal>
    )
}

const mapStateToProps = (state, props) => {
    return {
        lightbox: state.lightbox
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hidePortfolioItemLightbox: () => dispatch(hidePortfolioItemLightbox())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PortItemLightox);