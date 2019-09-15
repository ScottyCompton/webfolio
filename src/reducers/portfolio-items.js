
const PortfolioItemsReducerDefaultState = [];

// PortfolioItems reducer

export default (state = PortfolioItemsReducerDefaultState, action) => {
    switch (action.type) {

        case 'ADD_PORTFOLIO_ITEM':
            return [...state, action.portfolioItem];

        case 'REMOVE_PORTFOLIO_ITEM':
            return state.filter((portfolioItem) => {
                return portfolioItem.id !== action.id;
            });

        case 'UPDATE_PORTFOLIO_ITEM':
            
            return state.map((portfolioItem) => {
                if(portfolioItem.id === action.id) {
                    return {
                        ...portfolioItem,
                        ...action.updates
                    }
                } else {
                    return portfolioItem;
                }
            });

        case 'GET_PORTFOLIO_ITEMS':
            return action.portfolioItems;

        default:
            return state;
    }
};

