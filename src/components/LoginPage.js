import React from 'react'
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({startLogin}) => {
    return (
        <div className="box-layout">
            <div className="box-layout__box">
                <h1 className="box-layout__title">BoilerPlate</h1>
                <p>Boilerplate React App Ready To Go!</p>
                <button className="btn btn-primary" onClick={startLogin} type="submit">Login with Google</button>
            </div>
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);

