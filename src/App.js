import React, { Component, Suspense } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Spinner from "./components/common/Spinner";
import { Provider } from "react-redux";
import store from "./store";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import PrivateRoute from "./components/common/PrivateRoute";
import Login from "./components/accounts/Login";
import { loadUser } from "./actions/auth/auth";
import Alerts from "./components/common/Alerts";
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const Test = React.lazy(() => import("./components/common/Test"));

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
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Alerts />
            <Suspense fallback={<Spinner />}>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/test" component={Test} />
                <PrivateRoute path="/" component={Dashboard} />
              </Switch>
            </Suspense>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
