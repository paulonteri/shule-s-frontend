import React, { Component, Fragment, Suspense } from "react";
import PrivateRoute from "./common/PrivateRoute";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import Error404 from "./common/Error404";
import AppHeader from "../layout/AppHeader";
import AppFooter from "../layout/AppFooter";
import AppSider from "../layout/AppSider";
const Library = React.lazy(() => import("./library/Library"));
const Students = React.lazy(() => import("./students/Students"));
const Classes = React.lazy(() => import("./classes/Classes"));
const Dormitories = React.lazy(() => import("./dormitories/Dormitories"));
const Register = React.lazy(() => import("./accounts/Register"));
const { Content } = Layout;

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
                  <Suspense fallback={<div>Loading...</div>}>
                    <PrivateRoute exact path="/" component={Students} />
                    <Route exact path="/register" component={Register} />
                    <PrivateRoute path="/students" component={Students} />
                    <PrivateRoute path="/library" component={Library} />
                    <PrivateRoute path="/classes" component={Classes} />
                    <PrivateRoute path="/dorms" component={Dormitories} />
                  </Suspense>
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
