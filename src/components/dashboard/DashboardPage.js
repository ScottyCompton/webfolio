import React from 'react'
import { Link } from 'react-router-dom';
//import {Container, Row, Col, Button } from 'react-bootstrap';
import PortfolioItemsWithCats from './PortfolioItemsWithCats';

const DashboardPage = () => (
    <div className="container">
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="dashboard-title">
                    <h5> Your Portfolio </h5>            
                </div>
                <PortfolioItemsWithCats />
            </div>
        </div>
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Link className="float-right portfolio-list__manage-order btn btn-secondary" to="/dashboard/portfolio" style={{float: "left", marginLeft:"10px"}}>Manage Display Order</Link>
                <Link className="float-right portfolio-list__create-new btn btn-secondary" to="/dashboard/portfolio/create" style={{float: "left", marginLeft:"10px"}}>Create New Item</Link>
            </div>
        </div>


    </div>    
)

export default DashboardPage;