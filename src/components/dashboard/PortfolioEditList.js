import React, { useState } from 'react';
import uuid from 'uuid';
import {Container, Row, Col} from 'react-bootstrap';
//import { connect } from 'react-redux';
import { startRemovePortfolioItem } from 'actions/portfolio-items';
import portcats from 'fixtures/portcats';
import PortfolioEditListItem from './PortfolioEditListItem';
import { Link } from 'react-router-dom';
import MessageModal from  './MessageModal';

const PortfolioEditList = (props) => {

    const {handleDelete, handleCatSelectChange, portfolio, catId} = props;

    return (
        <Container>
        <Row>
            <Col className="col-xs-6 col-md-3 col-lg-2">
                <select className="form-control" value={catId} onChange={handleCatSelectChange} name="portfolio-cat" id="portfolio-cat">
                <option value="-1">Entire Portfolio</option>
                {portcats.map((cat) => {
                    return (<option key={uuid()} value={cat.id}>{cat.name}</option>)                    
                })}
                </select>
            </Col>
            <Col className="col-xs-6 col-md-9 col-lg-10">
            <Link className="portfolio-list__create-new btn btn-secondary float-right" to="/dashboard/portfolio/create">Create New Item</Link>
            <h5 className="float-right">Your Portfolio</h5>
            </Col>
        </Row>
            
        <Row>
            <Col className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="card bg-secondary mb-3">
                    <div className="portfolio-list">
                    {portfolio.length > 0 && portfolio.map((item) => (
                        <PortfolioEditListItem key={uuid()} portfolioItem={item} handleDelete={handleDelete} />
                    ))}      
                    {portfolio.length === 0 && <div className="text-center"><p>&nbsp;</p><h5 className="white-text">No portfolio items exist in this cateogry</h5></div>}
                    </div>          
                </div>
            </Col>
        </Row>

        </Container>
    )
}

export default PortfolioEditList;
