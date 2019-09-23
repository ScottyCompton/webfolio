import React from 'react';
import portcats from '../fixtures/portcats'
import uuid from 'uuid';
import PortfolioRail from './PortfolioRail';
import { connect } from 'react-redux';
import portfolioListFilter from 'selectors/portfolio-list-filter'



class PortCatRails extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                {
                    portcats.map((cat) => {
                        // const portfolioByCat = this.props.portfolio.filter((item) => {     
                        //     return (item.portcats && item.portcats.indexOf(cat.id+'') !== -1)                    
                        // })
                        const portfolioByCat = portfolioListFilter(this.props.portfolio, {catId: cat.id});

              
                        return (
                            <PortfolioRail key={uuid()} portfolio={portfolioByCat} title={cat.name} catId={cat.id} />
                        )
                    })
                }
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




// const PortCatRails = (props) => {

    // const [modalState, dispatch] = useReducer(railItemModalReducer, {
    //     showModal: false,
    //     portfolioItem: {}
    // });


    // const hideModal = () => {
    //     dispatch({
    //         type: 'HIDE_MODAL'
    //     })
    // }        

    // useEffect(() => {
    //     if(modalState.showModal) {
    //         dispatch({
    //             type: 'SHOW_MODAL',
    //             modalState.portfolioItem
    //         })
    //     } else {
    //         dispatch({
    //             type: 'HIDE_MODAL'
    //         })
    //     }
    // },[modalState]);


//     return (
//         <PortfolioRailItemModalContext.Provider value={{modalState, dispatch}}>
//         <div>
//             {
//                 portcats.map((cat) => {
//                     const portfolio = props.portfolio.filter((item) => {     
//                         return (item.portcats && item.portcats.indexOf(cat.id+'') !== -1)                    
//                     })
          
//                     return (
//                         <PortfolioRail key={uuid()} portfolio={potfolio} title={cat.name} catId={cat.id} />
//                     )
//                 })
//             }
//         </div>
//         </PortfolioRailItemModalContext.Provider>
//     );
// }

