import React, { useState } from 'react';
import uuid from 'uuid';
import {Container, Row, Col} from 'react-bootstrap';
//import { connect } from 'react-redux';
import { startRemovePortfolioItem } from '../actions/portfolio-items';
import PortfolioEditListItem from './PortfolioEditListItem';
import { Link } from 'react-router-dom';
import MessageModal from  './MessageModal';

const PortfolioEditList = (props) => {

    const {handleDelete, portfolio} = props;

    return (
        <Container>
        <Row>
            <Col className="col-xs-12">
            <Link className="portfolio-list__create-new btn btn-secondary float-right" to="/dashboard/portfolio/create">Create New Item</Link>
            <h5 className="float-right">Your Portfolio</h5>
            </Col>
        </Row>
            
        <Row>
            <Col className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="card bg-secondary mb-3">
                    <div className="portfolio-list">
                    {portfolio.map((item) => (
                        <PortfolioEditListItem key={uuid()} portfolioItem={item} handleDelete={handleDelete} />
                    ))}      
                    </div>          
                </div>
            </Col>
        </Row>

        </Container>
    )
}

export default PortfolioEditList;
