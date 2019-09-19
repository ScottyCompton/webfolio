import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import portcats from '../fixtures/portcats'
import uuid from 'uuid';
import ImageWithPreloader from './ImageWithPreloader';

const PortfolioEditListItem = ({portfolioItem, handleDelete}) => {
    let cats = [];
    if(portfolioItem.portcats && portfolioItem.portcats.length !== 0) {
        portfolioItem.portcats.forEach((catId) => {
            cats.push(`${portcats[catId].name}, `);
        })
        cats[cats.length-1] = cats[cats.length-1].replace(',','')
    } else {
        cats.push('-- No Categories Selected --')
    }

    return (
    <div className="portfolio-list__list-item">
        <div className="portfolio-list__list-item-img"><ImageWithPreloader className="portfolio-list__list-item-preloader" src={portfolioItem.previewImg} /></div>
        <div className="portfolio-list__list-item-title"><h5>{portfolioItem.projectTitle}</h5></div>
        <div className="portfolio-list__list-item-cats">{cats.length !== 0 && cats.map((cat) => (<span key={uuid()}>{cat}</span>) )}</div>
        <div className="portfolio-list__list-item-btns">
            <Link to={`/dashboard/portfolio/edit/${portfolioItem.id}`} className="btn btn-primary">Edit</Link>
            <Button data-id={portfolioItem.id} onClick={handleDelete} className="btn btn-danger">Delete</Button>
        </div>
    </div>
    )
    
};

export default PortfolioEditListItem;