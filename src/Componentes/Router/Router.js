import React, { Component } from "react";
import {BrowserRouter, Switch, Route, Redirect, } from "react-router-dom";
import {masterPage} from '../../Shared/masterPage';

import Home from '../Containers/Home/Home';
import ListByCountries from '../Containers/ListByCountries/ListByCountries.jsx';
import GlobalDataPerDay from '../Containers/GlobalDataPerDay/GlobalDataPerDay.jsx';
import Reports from '../Containers/Reports/Reports.jsx';

class Router extends Component {
  //El metodo de redireccionamiento. <Redirect from="/" to="/home" />
  render () {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/Home" component={Home}/>
            <Route exact path="/V3/Covid-19/ListByCountries" component={masterPage(ListByCountries)}/>
            <Route exact path="/V3/Covid-19/GlobalDataPerDay" component={masterPage(GlobalDataPerDay)}/>
            <Route exact path="/V3/Covid-19/Reports" component={masterPage(Reports)}/>
            <Redirect to ="/Home"/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

}
export default Router;
