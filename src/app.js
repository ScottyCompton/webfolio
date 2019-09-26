/* KNOWN ISSUES 

#########################################################    
/node_modules/react-overlays/Dropdown.js line 16:
#########################################################    

        change this:
    16    //var _uncontrollable = _interopRequireDefault(require("uncontrollable"));

        to this:
    16    var _uncontrollable = _interopRequireDefault(require("uncontrollable").uncontrollable);

#########################################################    
/node_modules/react-preload-image/index.js,  line 66:
#########################################################    

        change this:
    66       this.preloader.onload = null;

        to this:
    66      if(this.preloader) this.preloader.onload = null;

*/

import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter, { history } from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import { startGetPortfolioItems } from './actions/portfolio-items';
import { startGetSiteSettings } from 'actions/site-settings';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import LoadingPage from './components/LoadingPage';
import { firebase } from './firebase/firebase';


const store = configureStore();


const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    } else {
        hasRendered = false;
    }
};


ReactDOM.render(<LoadingPage />, document.getElementById('app'));



store.dispatch(startGetPortfolioItems())
    .then(() => {
        store.dispatch(startGetSiteSettings())
        .then(() => {
            renderApp();
        })
    })


firebase.auth().onAuthStateChanged((user) => {
    if(user) {
            store.dispatch(login(user.uid));
            if(window.localStorage.getItem('LOGINATTEMPT') === '1') {
                window.localStorage.removeItem('LOGINATTEMPT');
                history.push('/dashboard');
            }
    } else {
        if(history.location.pathname.includes('/dashboard')) {
            store.dispatch(logout());
            renderApp();
            history.push('/dashboard/login');
        }
    }
});








