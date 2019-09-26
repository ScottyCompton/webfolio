import React from 'react'
import { connect } from 'react-redux';
import PortfolioEditList from './PortfolioEditList';
import { startRemovePortfolioItem, startUpdatePortfolioItem } from '../../actions/portfolio-items';
import { listByCategory } from '../../actions/admin-portfolio-list-filter';
import portfolioListFilter from '../../selectors/portfolio-list-filter';
import AdminMessageModal from  './AdminMessageModal';
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

    handleDelete = (id) => {
        this.props.startRemovePortfolioItem({id})
    }

    doRedorder(currIdx, dir) {
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
            if(csoList !== undefined) {
                const csoItemIdx = csoList.findIndex((c) => {
                    return c.catId !== undefined ? c.catId+'' === catId+'' : false;
                })
    
                 if(csoItemIdx !== -1) {
                     csoList[csoItemIdx].sortOrder = idx;
                    item.cso = csoList
                 }
                this.props.startUpdatePortfolioItem(item.id, item)
            } else {
                // i wanna fuckin' know about it...
                alert('category-sortorder id array for ' + item.projectTitle + ' is undefined!');
            }
          
        }) 
    }


    handleMoveUp = (id, currIdx) => {
        this.doRedorder(currIdx, 'up')
    }

    handleMoveDown = (id, currIdx) => {
        this.doRedorder(currIdx, 'down')
    }

    confirmDelete = (e) => {
        const id = this.state.portfolioId;
        this.handleDelete(id)
        this.closeMsgModal();
    }

    showModal = (portfolioId) => {
        this.setState({
            showModal: true,
            portfolioId: portfolioId
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
            <AdminMessageModal 
                onHide={this.closeMsgModal} 
                onConfirm={this.confirmDelete} 
                show={this.state.showModal} 
                confirmBtnText="Yes, Delete this item."
                closeBtnText="Cancel & Exit"
                type="INFODELETE" 
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


