import React, { Component, Fragment } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { loadUser } from "../actions/auth/auth";

import PrivateRoute from "./common/PrivateRoute";
import Alerts from "./common/Alerts";
import Test from "./common/Test";
import Error404 from "./common/Error404";
import Login from "./accounts/Login";
import Dashboard from "./Dashboard";

// Alerts Options
const alertOptions = {
  timeout: 3250,
  position: "top center"
};

export class App extends Component {
    componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <div>
        <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Alerts />

              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/test" component={Test} />
                <PrivateRoute path="/" component={Dashboard} />
                <Route component={Error404} />
              </Switch>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
      </div>
    )
  }
}

export default App
