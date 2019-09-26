import React from 'react';
import { connect } from 'react-redux';
import {unloadLightbox, hideLightbox } from '../actions/portfolio-item-lightbox';
//import {Row, Col, Container } from 'react-bootstrap';
import uuid from 'uuid';
import Slider from 'react-slick';
//import ImageWithPreloader from './ImageWithPreloader';
//import SliderArrow from './SliderArrow';
//import breakpoints from '../fixtures/bootstrapBreakpoints';

class PortfolioItemLightbox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            portfolioItem: undefined,
            auxImgs: [], 
            useSlickSlider: this.getUseSlickSlider()
        }

    
        window.addEventListener('resize', (e) => {this.handleResize(e)});
    }
   


    handleResize = (e) => {
        this.setState({
            useSlickSlider:  this.getUseSlickSlider()
        })
    }


    getUseSlickSlider = () => {
        const breakpoint = 768;
        const w = window.innerWidth;
        return w >= breakpoint;
    }


    hideLightbox = () =>{
        this.props.unloadLightbox();
        setTimeout(() => {
            this.props.hideLightbox();
            document.querySelector('body').classList.remove('no-scroll')
        }, 500)
    }

    render() {       
        const {lightboxClass, portfolioItem} = this.props.primLightbox;

        const {projectTitle = '', shortDesc = '', longDesc = '', githubUrl = '', projectUrl=''} = portfolioItem;

        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            ladyLoad: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            swipeToSlide: true,
            centerPadding: "60px",
            arrows: false,
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

        return (

            <div className={`prim-container prim-container${lightboxClass}`}>
                <div className={`prim-content-wrapper prim-content-wrapper${lightboxClass}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12-col-lg-12">
                                <div className="prim-content">
                                    <div className="prim-slider-outer">
                                        <div className="prim-slider-inner">
                                            <div className="prim-infobox">
                                                <div className="prim-infobox__project-title">
                                                    <h4>{projectTitle}</h4>
                                                    {shortDesc}
                                                </div>
                                                <div className="prim-infobox__buttons">
                                                    <button className="btn btn-outline-secondary btn-sm" onClick={this.hideLightbox}>X</button>
                                                </div>
                                                
                                            </div>
                                        {((portfolioItem && portfolioItem.auxImgs) && this.state.useSlickSlider) &&
                                            <Slider {...settings}>
                                            {portfolioItem.auxImgs.map((item) => {
                                                return (
                                                    <img  key={uuid()} src={item} />
                                                )
                                            })}
                                            </Slider>
                                            }                                            
                                            {((portfolioItem && portfolioItem.auxImgs) && !this.state.useSlickSlider)  &&
                                                <div className="prim-scroller">
                                                    <div className="prim-scroller-inner">
                                                    {portfolioItem.auxImgs.map((item) => {
                                                        return (
                                                        <div key={uuid()}  className="prim-scroller-img">
                                                            <img src={item} />
                                                        </div>                                                        )
                                                    })}
                                                    </div>
                                                </div>
                                            }

                                          </div>                            
                                    </div>                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`prim-overlay prim-overlay${lightboxClass}`}></div>
            </div>
        )        
    }

}

const mapDispatchToProps = (dispatch) =>{
    return {
        unloadLightbox: () => dispatch(unloadLightbox()),
        hideLightbox: () => dispatch(hideLightbox())
    }
}

const mapStateToProps = (state, props) => {
    return {
        primLightbox: state.primLightbox
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PortfolioItemLightbox);
