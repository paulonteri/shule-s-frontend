import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
// import * as serviceWorker from "../serviceWorker";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import AppHeader from "../layout/AppHeader";
import AppFooter from "../layout/AppFooter";
import AppSider from "../layout/AppSider";
import Library from "./library/Library";
import Alerts from "../layout/Alerts";
import Students from "./students/Students";

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
                      margin: "24px 16px",
                      padding: 24,
                      background: "#fff",
                      minHeight: 280
                    }}
                  >
                    <div className="container">
                      <Switch>
                        <Route exact path="/" component={Students} />
                        <Route exact path="/library" component={Library} />
                      </Switch>
                    </div>
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
