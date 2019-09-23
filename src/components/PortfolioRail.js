import React from 'react';
import {Button, Row, Col, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Slider from 'react-slick';
import uuid from 'uuid';
import PortRailItem from './PortRailItem';
import SliderArrow from './SliderArrow';



const PortfolioRail = (props) => {
    
        const portItems = props.portfolio;

        

          const settings = {
            dots: false,
            infinite: true,
            speed: 2000,
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
                        centerMode: false
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        arrows: false,
                        swipeToSlide: true,
                        centerMode: false
                    }
                },

                {
                    breakpoint: 1200,
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
                        slidesToScroll:4,
                        arrows: true,
                        swipeToSlide: false,
                        centerMode: false
                    }
                }
            ]
          };    

        return (
            portItems.length > 0 &&
            <div className="portfolio-rail">
                <h4 className="portfolio-rail__title">{props.title}</h4>
                <Slider {...settings}>
                    {portItems.map((item) => {
                        return (
                            <PortRailItem onClickShowPortfolioItem={props.onClickShowPortfolioItem} data={item} key={uuid()} />
                        )
                    })}
                </Slider>
            </div>
        )
    }


export default PortfolioRail;


