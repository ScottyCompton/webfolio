import React from 'react';
import {Button, Row, Col, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import PortCatRails from './PortCatRails';
import HomePageSlider from './HomePageSlider';
import Footer from './Footer'


const HomePage = () => (
    <div style={{display: "flex", flexDirection: "column"}}>
        <Container fluid={true} className="no-padding">
            <Row className="no-padding">
                <Col className="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding">
                    <HomePageSlider />
                </Col>
            </Row>
            </Container>
        <Container>
            <Row>
                <Col className="col-xs-12 col-sm-12 col-md-12 col-lg-12 white-text">
                    <PortCatRails />
                </Col>
            </Row>
        </Container>
        <Container fluid={true} className="no-padding">
            <Row className="no-padding">
                <Col className="col-xs-12 col-sm-12 col-md-12 col-lg-12 white-text no-padding">
                    <Footer />
                </Col>
            </Row>
            
        </Container>

    </div>
);


export default HomePage;