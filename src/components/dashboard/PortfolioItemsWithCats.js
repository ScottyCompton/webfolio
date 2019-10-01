import React from 'react'
import { Link } from 'react-router-dom';
import portcats from '../../fixtures/portcats'
import listFilter from '../../selectors/portfolio-list-filter';
import { connect } from 'react-redux'
import uuid from 'uuid';

class PortfolioItemsWithCats extends React.Component  {
    _itemCount = 0;
    constructor(props) {
        super(props)
    }

    toDisplay =  () => {
        let itemCount = 0;

        const output = (
            portcats.map((cat) => {
                let catId = cat.id;
                let catName = cat.name;
                let unsortedPortItems = this.props.portfolio.filter((item) => {     
                    return (item.portcats && item.portcats.indexOf(catId+'') !== -1)                    
                })
                const noCat = {catId: '-1'};
                let portItems = listFilter(unsortedPortItems,{catId: '-1'});
                
                itemCount += portItems.length;
                return (
                    portItems.length > 0 &&
                    <div key={uuid()} className="portfolio-edit-select__group">
                        <h6>{catName}</h6>
                        <div className="portfolio-edit-select__list">
                            {portItems.map((item) => { 
                                const linkClass = item.published ? 'text-primary' : 'text-warning';
                                return (
                                    <div key={uuid()} className="portfolio-edit-select__item">
                                    {
                                        (this.handleClick && <Link to="#" data-id={item.id} onClick={this.handleItemClick}>{item.projectTitle}</Link>) ||
                                        <Link to={`/dashboard/portfolio/edit/${item.id}`}  className={linkClass}>{item.projectTitle}</Link>
                                    }
                                        
                                    </div>
                                    )
                            })}  
                        </div>
                    </div>
                    
                )
            })                        
        )

        if (itemCount === 0) {
            return (
                <div className="text-center" style={{width: "100%"}}>You currently have no items in your portfolio. Add some!</div>
            )
        } else {
            return output
        }
    }


    render() {
        
        return (
            <div className="portfolio-edit-select__container">{(this.toDisplay())}</div>
        )

    }
}





const mapStateToProps = (state, props) => {
    return {
        portfolio: state.portfolio
    }
}


export default connect(mapStateToProps)(PortfolioItemsWithCats);



