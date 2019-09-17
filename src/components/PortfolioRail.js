import React from 'react';
import {Button, Row, Col, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import uuid from 'uuid';
import PortRailItem from './PortRailItem';


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
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: true
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



