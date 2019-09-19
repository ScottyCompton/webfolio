import React from 'react'
import { Link } from 'react-router-dom';
import {Button } from 'react-bootstrap';

const DashboardPage = () => (
    <div className="container">
    <div>Dashboard Page Will Go here
    
        <br /><br />
        <Link className="btn btn-primary" to="/dashboard/portfolio">Go To Portfolio</Link>
    </div>
    </div>
    
)

export default DashboardPage;