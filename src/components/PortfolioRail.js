import React from 'react';
import Slider from 'react-slick';
import uuid from 'uuid';
import PortRailItem from './PortRailItem';
import SliderArrow from './SliderArrow';



const PortfolioRail = (props) => {
    

        const setRailCurrentState = (current) => {
            const railStates = JSON.parse(localStorage.getItem('railStates'));
            railStates.forEach((rail) => {
                const thisRailIdx = railStates.findIndex((rail) => {
                    return rail.catId+'' === props.catId+''
                })
                if(thisRailIdx !== -1) {
                    railStates[thisRailIdx].currentSlide = current;
                }
            })
            localStorage.setItem('railStates', JSON.stringify(railStates))
        }


        let initialSlide = 0;
        let railStates = JSON.parse(localStorage.getItem('railStates'));
        railStates.forEach((rail) => {
            const thisRailIdx = railStates.findIndex((rail) => {
                return rail.catId+'' === props.catId+''
            })
            if(thisRailIdx !== -1) {
                initialSlide = railStates[thisRailIdx].currentSlide;
            }
        })        

        const portItems = props.portfolio;
          const settings = {
            dots: false,
            infinite: true,
            speed: 2000,
            slidesToScroll: 1,
            centerMode: false,
            initialSlide: initialSlide,
            ladyLoad: true,
            slidesToShow: 5,
            afterChange: current => setRailCurrentState(current),
            nextArrow: <SliderArrow type='next' />,
            prevArrow: <SliderArrow type='prev' />,
            responsive: [
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        speed: 500,
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
                        speed: 1000,
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
                        speed: 1500,
                        arrows: true,
                        centerMode: false
                    }
                },
                {
                    breakpoint: 1900,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll:4,
                        speed: 2000,
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
                            <PortRailItem data={item} key={uuid()} />
                        )
                    })}
                </Slider>
            </div>
        )
    }


export default PortfolioRail;


