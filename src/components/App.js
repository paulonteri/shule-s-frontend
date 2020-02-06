import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
// import * as serviceWorker from "../serviceWorker";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import { transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Layout } from "antd";
const { Content } = Layout;

import { loadUser } from "../actions/auth/auth";

import PrivateRoute from "./common/PrivateRoute";
import Alerts from "./common/Alerts";
import AppHeader from "../layout/AppHeader";
import AppFooter from "../layout/AppFooter";
import AppSider from "../layout/AppSider";
import Library from "./library/Library";
import Students from "./students/Students";
import Classes from "./classes/Classes";
import Dormitories from "./dormitories/Dormitories";
import Test from "./common/Test";
import Register from "./accounts/Register";
import Login from "./accounts/Login";

// Alerts Options
const alertOptions = {
  timeout: 3250,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Alerts />

              <Layout style={{ minHeight: "100vh" }}>
                <AppSider />
                <Layout>
                  <AppHeader />
                  <Content
                    style={{
                      margin: "15px ",
                      marginTop: "1px ",
                      minHeight: 280
                    }}
                  >
                    <Switch>
                      <Route exact path="/login" component={Login} />
                      <PrivateRoute exact path="/" component={Students} />
                      <Route exact path="/register" component={Register} />
                      <PrivateRoute path="/students" component={Students} />
                      <PrivateRoute path="/library" component={Library} />
                      <PrivateRoute path="/classes" component={Classes} />
                      <PrivateRoute path="/dorms" component={Dormitories} />
                      <PrivateRoute exact path="/test" component={Test} />
                    </Switch>
                  </Content>
                  <AppFooter />
                </Layout>
              </Layout>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

// serviceWorker.register();
