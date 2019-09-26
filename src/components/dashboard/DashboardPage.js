import React from 'react'
import { Link } from 'react-router-dom';
//import {Container, Row, Col, Button } from 'react-bootstrap';
import PortfolioItemsWithCats from './PortfolioItemsWithCats';

const DashboardPage = () => (
    <div className="container">
    <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="dashboard-title">
                <h5><Link className="portfolio-list__create-new btn btn-secondary" to="/dashboard/portfolio/create" style={{float: "left", marginLeft:"0"}}>Create New Item</Link> Your Portfolio </h5>            
            </div>
            <PortfolioItemsWithCats />
        </div>
    </div>
    <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="dashboard-title">
                <h5>Your Settings</h5>            
            </div>        
            <div>
            <Link className="btn btn-primary" to="/dashboard/portfolio">Manage Portfolio</Link>
            <Link className="btn btn-primary" to="/dashboard/settings">Manage Settings</Link>
            </div>
        </div>
    </div>
    </div>
    
)

export default DashboardPage;