import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import portfolioItemsReducer from '../reducers/portfolio-items';
import admListFilterReducer from '../reducers/admin-portfolio-list-filter';
import settingsReducer from '../reducers/site-settings';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    // Redux store creation

    const store = createStore(
        combineReducers({
            auth: authReducer,
            portfolio: portfolioItemsReducer,
            admListFilter: admListFilterReducer,
            siteSettings: settingsReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
}


