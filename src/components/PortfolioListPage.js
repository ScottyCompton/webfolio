import React from 'react'
import { connect } from 'react-redux';
import PortfolioEditList from './PortfolioEditList';

export class PortfolioListPage extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <PortfolioEditList portfolio={this.props.portfolio} />
            </div>
        )
    }

}
    
const mapStateToProps = (state, props) => {
    return ({
        portfolio: state.portfolio
    })
}




export default connect(mapStateToProps)(PortfolioListPage);


