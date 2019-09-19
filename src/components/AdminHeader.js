import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const AdminHeader = ({ startLogout }) => (
    <header className="header bg-light">        
        <div className="container">
            <div className="header__content">
                <Link className="header__title" to="/dashboard"><h3>Webfolio Admin</h3></Link>
                <div><button className="btn btn-primary" onClick={startLogout}>Logout</button></div>
            </div>
        </div>
    </header>
);


const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(AdminHeader);