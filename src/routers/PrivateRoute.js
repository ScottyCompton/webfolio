import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import AdminFooter from '../components/AdminFooter';

export const PrivateRoute = ({ 
    isAuthenticated, 
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <div>
                <AdminHeader />
                    <div className="shell">
                        <Component {...props} />
                    </div>
                <AdminFooter />
            </div>
        ) : (
            <Redirect to="/dashboard/login" />
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);