import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from 'reducers/auth';
import portfolioItemsReducer from 'reducers/portfolio-items';
import primLightboxReducer from 'reducers/portfolio-item-lightbox';
import admListFilterReducer from 'reducers/admin-portfolio-list-filter';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    // Redux store creation

    const store = createStore(
        combineReducers({
            auth: authReducer,
            portfolio: portfolioItemsReducer,
            primLightbox: primLightboxReducer,
            admListFilter: admListFilterReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
}


