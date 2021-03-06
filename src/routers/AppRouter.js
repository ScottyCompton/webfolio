import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import DashboardPage from '../components/dashboard/DashboardPage';
import HomePage from '../components/HomePage';
import NotFoundPage from '../components/NotFoundPage';
import PortfolioListPage from '../components/dashboard/PortfolioListPage';
import EditPortfolioItemPage from '../components/dashboard/EditPortfolioItemPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import LoginPage from '../components/dashboard/LoginPage';
import SiteSettingsPage from '../components/dashboard/SiteSettingsPage';
import PortfolioItemDetailsPage from '../components/PortfolioItemDetailsPage';
import Fibonacci from '../components/misc/Fibonacci';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
export const history = createBrowserHistory();


const AppRouter = (props) => {

return (
  <Router history={history} >
  <Route render={({location}) => {
      return (
        <TransitionGroup className="RTG">
        <CSSTransition 
            key={location.key}
            timeout={1000}
            classNames="fade"
        >
          <div>
            <Switch location={location}>
            <PublicRoute path="/" component={HomePage} exact={true} />
            <PublicRoute path="/fibcalc" component={Fibonacci} exact={true} />
            <PublicRoute path="/portfolio/:id" component={PortfolioItemDetailsPage} />
              <Route
                path="/dashboard"
                render={({ match: { url } }) => (
                <div>
                  <Route path={`${url}/login`} component={LoginPage} exact={true} />
                  <PrivateRoute path={`${url}/`} component={DashboardPage} exact />
                  <PrivateRoute path={`${url}/settings`} component={SiteSettingsPage} exact />
                  <PrivateRoute path={`${url}/portfolio`} component={PortfolioListPage} exact={true} />
                  <PrivateRoute path={`${url}/portfolio/edit/:id`} component={EditPortfolioItemPage} exact={true} />
                  <PrivateRoute path={`${url}/portfolio/create`} component={EditPortfolioItemPage} exact={true} />
                </div>
                  )}
                />            
              <Route component={NotFoundPage} />
            </Switch>   
          </div>
        </CSSTransition>
      </TransitionGroup>
      );
    }} /> 
  </Router>)

};


export default AppRouter;
