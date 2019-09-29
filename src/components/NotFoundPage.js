import React from 'react';
import {Link} from 'react-router-dom';


const NotFoundPage = () => (
    <div className="container">
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div><h1>Error 404</h1></div>
                <p>&nbsp;</p>
                <h1 className="text-center">Whatever you're looking for,</h1>
                <div className="text-center">
                    <img src="https://media.giphy.com/media/Uy95VBz69cGQg/giphy.gif" />
                </div>
                <div className="text-center">
                    <h1>It's not here.</h1>
                </div>
                <div className="text-center">
                    <p>&nbsp;</p>
                    <Link to="/" class="btn btn-warning">Leave this place</Link>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                </div>
            </div>
        </div>
    </div>
);


export default NotFoundPage;