import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import portfolioItemsReducer from '../reducers/portfolio-items';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    // Redux store creation

    const store = createStore(
        combineReducers({
            auth: authReducer,
            portfolio: portfolioItemsReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
}


