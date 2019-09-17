import React from 'react';
import {Button, Row, Col, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import portcats from '../fixtures/portcats'
import uuid from 'uuid';
import PortfolioRail from './PortfolioRail';

const PortCatRails = () => {
    return (
        <div>
            {
                portcats.map((cat) => {
                    return (
                        <PortfolioRail key={uuid()} title={cat.name} catId={cat.id} />
                    )
                })
            }
        </div>
    );
}



    


export default PortCatRails;