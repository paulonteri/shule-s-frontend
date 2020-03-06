import React, { Component, Fragment, Suspense, IndexRedirect } from "react";
import PrivateRoute from "./common/PrivateRoute";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Layout } from "antd";
import Spinner from "./common/Spinner";
import Error404 from "./common/Error404";
const { Content } = Layout;
const AppHeader = React.lazy(() => import("../layout/AppHeader"));
const AppFooter = React.lazy(() => import("../layout/AppFooter"));
const AppSider = React.lazy(() => import("../layout/AppSider"));
const Library = React.lazy(() => import("./library/Library"));
const Students = React.lazy(() => import("./students/Students"));
const Classes = React.lazy(() => import("./classes/Classes"));
const Dormitories = React.lazy(() => import("./dormitories/Dormitories"));
const Register = React.lazy(() => import("./accounts/Register"));

export class Dashboard extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Layout style={{ minHeight: "100vh" }}>
            <Suspense fallback={<Spinner />}>
              <AppSider />
            </Suspense>
            <Layout>
              <Suspense fallback={<Spinner />}>
                <AppHeader />
              </Suspense>
              <Content
                style={{
                  margin: "15px ",
                  marginTop: "1px ",
                  minHeight: "100vh"
                }}
              >
                <Switch>
                  <Suspense fallback={<Spinner />}>
                    <PrivateRoute exact path="/" component={Students} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/spinner" component={Spinner} />
                    <PrivateRoute path="/students" component={Students} />
                    <PrivateRoute path="/library" component={Library} />
                    <PrivateRoute path="/classes" component={Classes} />
                    <PrivateRoute path="/dorms" component={Dormitories} />
                  </Suspense>
                  <Route component={Error404} />
                </Switch>
              </Content>
              <Suspense fallback={<Spinner />}>
                <AppFooter />
              </Suspense>
            </Layout>
          </Layout>
        </Fragment>
      </Router>
    );
  }
}

export default Dashboard;
