
const PortfolioItemModalState = {portfolioItem: undefined, showModal: false};

export default (state = PortfolioItemModalState, action) => {
    switch (action.type) {

        case 'HIDE_PORTFOLIO_ITEM_MODAL':
            return {
                ...state,
                showModal: false
            };

        case 'SHOW_PORTFOLIO_ITEM_MODAL':
            return {
                ...state,
                showModal: true,
                portfolioItem: action.portfolioItem
            }
        default:
            return state;
        }
    }