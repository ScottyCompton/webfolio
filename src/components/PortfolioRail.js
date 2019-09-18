import React from 'react';
import {Button, Row, Col, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import uuid from 'uuid';
import PortRailItem from './PortRailItem';
import SliderArrow from './SliderArrow';


class PortfolioRail extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
    
          const portItems = this.props.portfolio.filter((item) => {     
              return (item.portcats && item.portcats.indexOf(this.props.catId+'') !== -1)                    
          })

          const settings = {
            dots: false,
            className: "center",
            centerPadding: "80px",
            infinite: true,
            speed: 500,
            slidesToScroll: 1,
            centerMode: false,
            ladyLoad: true,
            slidesToShow: 5,
            nextArrow: <SliderArrow type='next' />,
            prevArrow: <SliderArrow type='prev' />,
            responsive: [
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        swipeToSlide: true,
                        centerMode: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        arrows: false,
                        swipeToSlide: true,
                        centerMode: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        arrows: true,
                        centerMode: false
                    }
                },
                {
                    breakpoint: 1900,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        arrows: true,
                        swipeToSlide: false,
                        centerMode: false
                    }
                }
            ]
          };    

        return (
            portItems.length > 0 &&
            <div>
                <h4>{this.props.title}</h4>
                <Slider {...settings}>
                    {portItems.map((item) => {
                        return (
                            <PortRailItem data={item} key={uuid()} />
                        )
                    })}
                </Slider>
            </div>
        )
    }
}


const mapStateToProps = (state, props) => {
    return {
        portfolio: state.portfolio
    }
}

export default connect(mapStateToProps)(PortfolioRail);



