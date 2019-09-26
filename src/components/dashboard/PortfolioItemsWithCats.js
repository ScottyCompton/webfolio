import React from 'react'
import { Link } from 'react-router-dom';
import portcats from '../../fixtures/portcats'
import { connect } from 'react-redux'
import uuid from 'uuid';

class PortfolioItemsWithCats extends React.Component  {
    constructor(props) {
        super(props)
    }

    render() {
        const toDisplay = (
            portcats.map((cat) => {
                let catId = cat.id;
                let catName = cat.name;
                let portItems = this.props.portfolio.filter((item) => {     
                    return (item.portcats && item.portcats.indexOf(catId+'') !== -1)                    
                })            
                return (
                    portItems.length > 0 &&
                    <div key={uuid()} className="portfolio-edit-select__group">
                        <h6>{catName}</h6>
                        <div className="portfolio-edit-select__list">
                            {portItems.map((item) => {
                                return (
                                    <div key={uuid()} className="portfolio-edit-select__item">
                                    {
                                        (this.handleClick && <Link to="#" data-id={item.id} onClick={this.handleItemClick}>{item.projectTitle}</Link>) ||
                                        <Link to={`/dashboard/portfolio/edit/${item.id}`}>{item.projectTitle}</Link>
                                    }
                                        
                                    </div>
                                    )
                            })}  
                        </div>
                    </div>
                    
                )
            })            
            
        );

        return (
            <div className="portfolio-edit-select__container">{toDisplay}</div>
        )

    }
}





const mapStateToProps = (state, props) => {
    return {
        portfolio: state.portfolio
    }
}


export default connect(mapStateToProps)(PortfolioItemsWithCats);



