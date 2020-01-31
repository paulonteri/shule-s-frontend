import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
// import * as serviceWorker from "../serviceWorker";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Alerts from "../layout/Alerts";
import AppHeader from "../layout/AppHeader";
import AppFooter from "../layout/AppFooter";
import AppSider from "../layout/AppSider";
import Library from "./library/Library";
import Students from "./students/Students";
import Classes from "./classes/Classes";
import Dormitories from "./dormitories/Dormitories";
import Test from "./Test";

import { Provider } from "react-redux";
import store from "../store";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Layout } from "antd";
const { Content } = Layout;

// Alerts Options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
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
                      <Route exact path="/" component={Students} />
                      <Route path="/library" component={Library} />
                      <Route path="/classes" component={Classes} />
                      <Route path="/dorms" component={Dormitories} />
                      <Route exact path="/test" component={Test} />
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
