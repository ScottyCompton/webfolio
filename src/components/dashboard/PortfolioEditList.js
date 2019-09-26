import React, { useState, useCallback } from 'react';
import uuid from 'uuid';
import portcats from '../../fixtures/portcats';
import PortfolioEditListItem from './PortfolioEditListItem';
import { Link } from 'react-router-dom';


const PortfolioEditList = (props) => {

    const {handleDelete, 
        handleCatSelectChange, 
        handleMoveUp, 
        handleMoveDown, 
        portfolio, 
        catId} = props;

    return (
        <div className="container">
        <div className="row">
            <div className="col-xs-6 col-md-3 col-lg-2">
                <select className="form-control" value={catId} onChange={handleCatSelectChange} name="portfolio-cat" id="portfolio-cat">
                <option value="-1">Entire Portfolio</option>
                {portcats.map((cat) => {
                    return (<option key={uuid()} value={cat.id}>{cat.name}</option>)                    
                })}
                </select>
            </div>
            <div className="col-xs-6 col-md-9 col-lg-10">
                <Link className="portfolio-list__create-new btn btn-secondary float-right" to="/dashboard/portfolio/create">Create New Item</Link>
                <h5 className="float-right">Your Portfolio</h5>
            </div>
        </div>
            
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="card bg-secondary mb-3">
                    <div className="portfolio-list">
                    {portfolio.length > 0 && portfolio.map((item, i) => (
                        <PortfolioEditListItem 
                        key={uuid()} 
                        portfolioItem={item} 
                        handleDelete={handleDelete}
                        handleMoveUp={handleMoveUp}
                        handleMoveDown={handleMoveDown}
                        canReorder={catId+'' !== '-1'}
                        currIdx={i}
                        firstItem={i === 0}
                        lastItem={i === portfolio.length-1}
                         />                        
                    ))}      
                    {portfolio.length === 0 && <div className="text-center"><p>&nbsp;</p><h5 className="white-text">No portfolio items exist in this cateogry</h5></div>}
                    </div>          
                </div>
            </div>
        </div>

        </div>
    )
}

export default PortfolioEditList;
