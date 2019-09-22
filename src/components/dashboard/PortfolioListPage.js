import React from 'react'
import { connect } from 'react-redux';
import PortfolioEditList from './PortfolioEditList';
import { startRemovePortfolioItem } from 'actions/portfolio-items';
import MessageModal from  './MessageModal';

export class PortfolioListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            portfolioId: ''       
        }
    }


    handleDelete = (id) => {
        this.props.startRemovePortfolioItem({id})
    }


    confirmDelete = (e) => {
        const id = this.state.portfolioId;
        this.handleDelete(id)
        this.closeMsgModal();
    }

    showModal = (e) => {
        e.preventDefault();
        this.setState({
            showModal: true,
            portfolioId: e.target.getAttribute('data-id')
        });
    }

    closeMsgModal = () => {
        this.setState({
            showModal: false,
            portfolioId: ''
        })
    }


    render() {
        return (
            <div>
            <MessageModal 
                onHide={this.closeMsgModal} 
                onConfirm={this.confirmDelete} 
                show={this.state.showModal} 
                type="INFO" 
                message="Are you certain you want to delete this portfolio item?"
                />            
                <PortfolioEditList handleDelete={this.showModal} portfolio={this.props.portfolio} />
            </div>
        )
    }

}
    
const mapStateToProps = (state, props) => {
    return ({
        portfolio: state.portfolio
    })
}



const mapDispatchToProps = (dispatch) => {
    return {
        startRemovePortfolioItem: ({id}) => dispatch(startRemovePortfolioItem({id}))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PortfolioListPage);


