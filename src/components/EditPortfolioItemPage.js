import React from 'react'
import { startAddPortfolioItem, startUpdatePortfolioItem } from '../actions/portfolio-items';
import PortfolioEditForm from './PortfolioEditForm';
import { connect } from 'react-redux';

export class EditPortfolioItemPage extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidUpdate(prevProps) {
        const currPortfolio = this.props.portfolio;
        const prevPortfolio = prevProps.portfolio;

        // to redirect the page to the edit url after creating a portfolio item
        if(prevPortfolio.length !== 0 && currPortfolio.length !== 0) {
            if(currPortfolio.length > prevPortfolio.length) {
                const newId = currPortfolio[currPortfolio.length-1].id;
                this.props.history.push(`/dashboard/portfolio/edit/${newId}`);
                }
        }
    }


    onSubmit = (portfolioItem) => {
        if(this.props.portfolioItem) {
            this.props.startUpdatePortfolioItem(this.props.portfolioItem.id, portfolioItem);
        } else {
            this.props.startAddPortfolioItem(portfolioItem)
        }
    }    

    render() {
        return (
            this.props. dataLoaded && 
            <PortfolioEditForm portfolioItem={this.props.portfolioItem} onSubmit={this.onSubmit} />
        )
            
    }
}



const mapDispatchToProps = (dispatch) => ({
    startAddPortfolioItem: (portfolioItem) => {dispatch(startAddPortfolioItem(portfolioItem))},
    startUpdatePortfolioItem: (id, portfolioItem) => {dispatch(startUpdatePortfolioItem(id, portfolioItem))}
});


const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    const portfolioItem = state.portfolio.find((item) => item.id === props.match.params.id)

    // this is to compensate for latency between firebase data load that caused the form to
    // initially load without data on an edit.  When state changes, page rerenders but the 
    // edit form does not.  As a result, page refresh on the edit page/form when editing an
    // existing item caused the form to be empty, since it's the first intial load that results
    // in the form display, not the second.

    const dataLoaded = id ? portfolioItem !== undefined : true;

    return {
        portfolioItem,
        dataLoaded,
        portfolio: state.portfolio
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(EditPortfolioItemPage)
