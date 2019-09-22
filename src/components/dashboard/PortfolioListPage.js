import React from 'react'
import { connect } from 'react-redux';
import PortfolioEditList from './PortfolioEditList';
import { startRemovePortfolioItem } from 'actions/portfolio-items';
import { listByCategory, listAll} from 'actions/admin-portfolio-list-filter';
import portfolioListFilter from 'selectors/admin-portfolio-list-filter';
import MessageModal from  './MessageModal';

export class PortfolioListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            portfolioId: '',
            catId: props.catId       
        }
    }

    handleCatSelectChange = (e) => {
        const catId = e.target.value;
        this.setState({
            catId
        })
        this.props.listByCategory({catId});
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
                <PortfolioEditList handleCatSelectChange={this.handleCatSelectChange} catId={this.state.catId} handleDelete={this.showModal} portfolio={this.props.portfolio} />
            </div>
        )
    }

}
    
const mapStateToProps = (state, props) => {
    return ({
        portfolio: portfolioListFilter(state.portfolio, state.admListFilter)
    })
}



const mapDispatchToProps = (dispatch) => {
    return {
        startRemovePortfolioItem: ({id}) => dispatch(startRemovePortfolioItem({id})),
        listByCategory: ({catId}) => dispatch(listByCategory({catId})), 
        listAll: () => dispatch(listAll())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PortfolioListPage);


