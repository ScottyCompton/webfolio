import React from 'react';
import {Button, Row, Col, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import PortCatRails from './PortCatRails';

const HomePage = () => (
    <Container>
    <Row>
        <Col className="col-xs-12 col-sm-12 col-md-12 col-lg-12 white-text">
            <PortCatRails />
        </Col>
    </Row>
    </Container>
);


export default HomePage;