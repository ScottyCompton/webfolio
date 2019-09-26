import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import SiteTitle from '../components/SiteTitle';

export const PublicRoute = ({ 
    isAuthenticated, 
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        <div className="page">
            <SiteTitle />
            <Component {...props} />
        </div>
        // isAuthenticated ? (
        //     <Redirect to="/dashboard" />
        // ) : (
        //     <PortfolioRailItemModal />
        //     <Component {...props} />
        // )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);