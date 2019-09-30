import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCogs, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'



export const AdminHeader = ({ startLogout }) => (
    <header className="header bg-light">        
        <div className="container">
            <div className="header__content">
                <Link className="header__title" to="/dashboard"><h3><span style={{fontSize: "2.0rem"}}>web</span>Folio Admin</h3></Link>
                <div className="header_links">
                    <Link to="/" className="btn btn-secondary btn-sm" style={{marginRight: "20px"}} target="_blank">View Website</Link>
                    <Link to="/dashboard/settings" title="Site Settings"><FontAwesomeIcon icon={faCogs} size="2x"></FontAwesomeIcon></Link>
                    <Link to="#logout" onClick={startLogout} title="Logout"><FontAwesomeIcon icon={faSignOutAlt} size="2x"></FontAwesomeIcon></Link>
                </div>
            </div>
        </div>
    </header>
);


const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(AdminHeader);