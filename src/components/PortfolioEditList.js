import React from 'react';
import uuid from 'uuid';
import { Link } from 'react-router-dom';

const PortfolioEditList = (props) => (
    <div className="container">
        <div className="jumbotron bg-dark">

            {props.portfolio.map((item) => {
                return (
                    <div key={uuid()} style={{display: "flex"}}>
                        <div><img src={item.previewImg} style={{width: "100px"}} /></div>
                        <div>
                            <Link to={`/dashboard/portfolio/edit/${item.id}`}>
                                {item.projectTitle}
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
)

export default PortfolioEditList;