import React, { Component, Fragment } from "react";

import {
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { Layout } from "antd";
const { Content } = Layout;

import PrivateRoute from "./common/PrivateRoute";
import Error404 from "./common/Error404";
import AppHeader from "../layout/AppHeader";
import AppFooter from "../layout/AppFooter";
import AppSider from "../layout/AppSider";
import Library from "./library/Library";
import Students from "./students/Students";
import Classes from "./classes/Classes";
import Dormitories from "./dormitories/Dormitories";
import Register from "./accounts/Register";

export class Dashboard extends Component {
  render() {
    return (
      <Router>
        <Fragment>
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
                  {/* <Route exact path="/login" component={Login} /> */}

                  <PrivateRoute exact path="/" component={Students} />
                  <Route exact path="/register" component={Register} />
                  <PrivateRoute path="/students" component={Students} />
                  <PrivateRoute path="/library" component={Library} />
                  <PrivateRoute path="/classes" component={Classes} />
                  <PrivateRoute path="/dorms" component={Dormitories} />
                  <Route component={Error404} />
                </Switch>
              </Content>
              <AppFooter />
            </Layout>
          </Layout>
        </Fragment>
      </Router>
    );
  }
}

export default Dashboard;
