import React, {useState} from 'react';
import Slider from 'react-slick';
import uuid from 'uuid';
import { connect } from 'react-redux';

class HeroSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windowState: this.getWindowState()
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize.bind(this));
    }

    handleResize = (e) => {
        const currState = this.state.windowState;
        const eventWindowState = this.getWindowState();

        const t = document.querySelectorAll('.hide-on-resize');
        t.forEach((item) => {
            item.classList.add('slider-perpective-transition');
            setTimeout(() => {
                item.classList.remove('slider-perpective-transition');
                },750);  

        })




        if(currState != '' && currState !== eventWindowState) {

            const s = document.querySelectorAll('.trans-on-resize');
            s.forEach((item) => {
                item.classList.add('slider-perpective-transition');
                setTimeout(() => {
                    item.classList.remove('slider-perpective-transition');
                },750)
                              
            })


            this.setState({
                windowState: eventWindowState
            })
        }
    }


    getWindowState = () => {
        var w = window.innerWidth;
        var h = window.innerHeight;
        return w < h ? 'portrait' : 'landscape';
    }


    render () {

        const settings = {
            dots: false,
            infinite: true,
            speed: 2500,
            slidesToScroll: 1,
            centerMode: false,
            ladyLoad: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 7000,
            arrows: false,
            centerMode: false,
            swipeToSlide: false,        
        };    


        const slides = [];
        let foregroundImg;

        this.props.sliderImgs.forEach((img) => {
            if(img.orientation === this.state.windowState) {
                if(img.isForeground) {
                    foregroundImg = img.src;
                } else {
                    slides.push(img.src);
                }
            }
        });


        const foregroundStyle = {
            backgroundImage: `url(${foregroundImg})`
        }

        return (
            <div className="container-fluid no-padding">
                <div className="row no-padding">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding">
                        <div id="heroslider" className="heroslider-container trans-on-resize hide-on-nav">
                            <div className={`heroslider-${this.state.windowState}`}>
                                {foregroundImg && <div className="heroslider__foreground trans-on-resize" style={foregroundStyle}></div>}
                                <div className="heroslider__background trans-on-resize hide-on-resize">
                                    <Slider {...settings}>
                                        {slides.map((slide) => {
                                            return (
                                                <img src={slide} key={uuid()} />
                                            )
                                        })}
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )        
    }

}



const mapStateToProps = (state, props) => {
    return {
        sliderImgs: state.siteSettings.sliderImgs
    }
}



export default connect(mapStateToProps)(HeroSlider);