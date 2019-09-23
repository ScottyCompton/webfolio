import React from 'react'
import { connect } from 'react-redux';
import PortfolioEditList from './PortfolioEditList';
import { startRemovePortfolioItem, startUpdatePortfolioItem } from 'actions/portfolio-items';
import { listByCategory } from 'actions/admin-portfolio-list-filter';
import portfolioListFilter from 'selectors/portfolio-list-filter';
import MessageModal from  './MessageModal';
//import { DndProvider } from 'react-dnd'
//import HTML5Backend from 'react-dnd-html5-backend'

export class PortfolioListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            portfolioId: ''     
        }
    }

    handleCatSelectChange = (e) => {
        const catId = e.target.value;
        this.props.listByCategory({catId});
    }

    handleDelete = (id, currIdx) => {
        this.props.startRemovePortfolioItem({id})
    }

    doRedorder(id, currIdx, dir) {
        //move item up in the list (make sortOrder smaller)
        // or move item down the list (make sortOrder larger)
        const catId = this.props.catId;
        const updateList = this.props.portfolio;

        const itemToMove = updateList[currIdx];
        updateList.splice(currIdx, 1);
        if(dir==='up') {
            updateList.splice(currIdx - 1, 0, itemToMove);
        } else {
            updateList.splice(currIdx + 1, 0, itemToMove);
        }

        updateList.forEach((item, idx) => {
             const csoList = item.cso 
            //     // an array of objects expressed as
            //     // {catId: xxx, sortOrder: nnn}
            const csoItemIdx = csoList.findIndex((c) => {
                return c.catId+'' === catId+''
            })

             if(csoItemIdx !== -1) {
                 csoList[csoItemIdx].sortOrder = idx;
                item.cso = csoList
             }
            this.props.startUpdatePortfolioItem(item.id, item)
        }) 
    }


    handleMoveUp = (id, currIdx) => {
        this.doRedorder(id, currIdx, 'up')
    }

    handleMoveDown = (id, currIdx) => {
        this.doRedorder(id, currIdx, 'down')
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
                    <PortfolioEditList 
                        handleCatSelectChange={this.handleCatSelectChange} 
                        catId={this.props.catId} 
                        handleDelete={this.showModal} 
                        portfolio={this.props.portfolio}
                        handleMoveUp={this.handleMoveUp}
                        handleMoveDown={this.handleMoveDown} />
            </div>
        )
    }

}
    
const mapStateToProps = (state, props) => {
    return ({
        portfolio: portfolioListFilter(state.portfolio, state.admListFilter),
        catId: state.admListFilter.catId
    })
}



const mapDispatchToProps = (dispatch) => {
    return {
        startRemovePortfolioItem: ({id}) => dispatch(startRemovePortfolioItem({id})),
        startUpdatePortfolioItem: (id, updates) => dispatch(startUpdatePortfolioItem(id, updates)),
        listByCategory: ({catId}) => dispatch(listByCategory({catId}))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PortfolioListPage);


