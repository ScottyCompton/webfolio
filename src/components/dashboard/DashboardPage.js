import React from 'react'
import { Link } from 'react-router-dom';
import {Container, Row, Col, Button } from 'react-bootstrap';
import PortfolioItemsWithCats from './PortfolioItemsWithCats';

const DashboardPage = () => (
    <Container>
    <Row>
        <Col>
            <div className="dashboard-title">
                <h5>Your Portfolio <Link className="portfolio-list__create-new btn btn-secondary" to="/dashboard/portfolio/create">Create New Item</Link></h5>            
            </div>
            <PortfolioItemsWithCats />
        </Col>
    </Row>
    <Row>
        <Col>
            <div className="dashboard-title">
                <h5>Your Settings</h5>            
            </div>        
            <div>
                Various site settings will go here
            </div>
        </Col>
    </Row>
    </Container>
    
)

export default DashboardPage;