import React from 'react';
import portcats from '../fixtures/portcats'
import uuid from 'uuid';
import PortfolioRail from './PortfolioRail';
import { connect } from 'react-redux';
import portfolioListFilter from '../selectors/portfolio-list-filter'



class PortCatRails extends React.Component {
    constructor(props) {
        super(props);

        const railStates = JSON.parse(localStorage.getItem('railStates'));
        portcats.forEach((cat) => {
            const thisRailIdx = railStates.findIndex((rail) => {
                return rail.catId+'' === cat.id+''
            })
            if(thisRailIdx === -1) {
                railStates.push({
                    catId: cat.id,
                    currentSlide: 0
                })
            } 
        });
        localStorage.setItem('railStates', JSON.stringify(railStates))

    }


    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <h1 className="text-primary home-section-title">My Past Works</h1>
                            <p className="text-white d-block d-sm-none">Swipe to navigate galleries / click to view details</p>
                            <p>&nbsp;</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 white-text">
                        {
                            portcats.map((cat) => {
                                const portfolioByCat = portfolioListFilter(this.props.portfolio, {catId: cat.id}, true);

                                return (
                                    (portfolioByCat.length >= 4) && <PortfolioRail key={uuid()} portfolio={portfolioByCat} title={cat.name} catId={cat.id} />
                                )
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
        );        
    }

}



const mapStateToProps = (state, props) => {
    return {
        portfolio: state.portfolio
    }
}

export default connect(mapStateToProps)(PortCatRails);
