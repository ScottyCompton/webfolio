import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import AdminHeader from 'components/dashboard/AdminHeader';
import AdminFooter from 'components/dashboard/AdminFooter';
import SiteTitle from 'components/SiteTitle';

export const PrivateRoute = ({ 
    isAuthenticated, 
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div className="page">
                <SiteTitle pageTitle="Webfolio Admin - " />
                <AdminHeader />
                    <div className="shell">
                        <Component {...props} />
                    </div>
                <AdminFooter />
            </div>
        ) : (
            <div className="page">
                <SiteTitle pageTitle="Webfolio Admin Login " />
                <Redirect to="/dashboard/login" />
            </div>
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);