import React from 'react'
//import {Row, Col, Container} from 'react-bootstrap';
import ReturnScroll from './ReturnScroll';

const Footer = (props) => {

    return (
        <div className="container">
            <div className="row no-padding">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 white-text no-padding">
                    <footer>
                        <div className="app-footer text-center">
                            <span className="text-primary">That's all, folks...</span>
                            <br /><br />
                            Scott C. Lonis, a.k.a. Scotty Compton<br />
                            Dallas, Texas and sometimes Jaco, Costa Rica<br/>
                            (806)-503-9174 | scott.lonis@outlook.com

                        </div>
                        
                    </footer>
                </div>
            </div>
            <ReturnScroll />
        </div>
    );
}

export default Footer;