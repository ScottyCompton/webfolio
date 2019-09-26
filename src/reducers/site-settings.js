
const SiteSettingsReducerDefaultState = {};

// PortfolioItems reducer

export default (state = SiteSettingsReducerDefaultState, action) => {
    switch (action.type) {

        // case 'ADD_PORTFOLIO_ITEM':
        //     return [...state, action.portfolioItem];

        // case 'REMOVE_PORTFOLIO_ITEM':
        //     return state.filter((portfolioItem) => {
        //         return portfolioItem.id !== action.id;
        //     });

        case 'UPDATE_SITE_SETTINGS':
            return action.updates;

        case 'GET_SITE_SETTINGS':
            return action.settings;

        default:
            return state;
    }
};

