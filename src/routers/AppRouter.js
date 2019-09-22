import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import DashboardPage from '../components/DashboardPage';
import HomePage from '../components/HomePage';
import NotFoundPage from '../components/NotFoundPage';
import PortfolioListPage from '../components/PortfolioListPage';
import EditPortfolioItemPage from '../components/EditPortfolioItemPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import LoginPage from '../components/LoginPage';

export const history = createBrowserHistory();


const AppRouter = (props) => {
  
    return (
    <Router history={history} >
    <Route render={({location}) => {
        return (
          <Switch location={location}>
            <PublicRoute path="/" component={HomePage} exact={true} />
            <Route
              path="/dashboard"
              render={({ match: { url } }) => (
              <div>
                <Route path={`${url}/login`} component={LoginPage} exact={true} />
                <PrivateRoute path={`${url}/`} component={DashboardPage} exact />
                <PrivateRoute path={`${url}/portfolio`} component={PortfolioListPage} exact={true} />
                <PrivateRoute path={`${url}/portfolio/edit/:id`} component={EditPortfolioItemPage} exact={true} />
                <PrivateRoute path={`${url}/portfolio/create`} component={EditPortfolioItemPage} exact={true} />
              </div>
                )}
              />            
            <Route component={NotFoundPage} />
          </Switch>   
        );
      }} /> 
    </Router>

)};


export default AppRouter;