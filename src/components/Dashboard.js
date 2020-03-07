import React, { Component, Suspense, IndexRedirect } from "react";
import PrivateRoute from "./common/PrivateRoute";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from "react-router-dom";
import Spinner from "./common/Spinner";
import Error404 from "./common/Error404";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  IdcardOutlined,
  ReadOutlined,
  TeamOutlined
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const AppFooter = React.lazy(() => import("../layout/AppFooter"));
const Library = React.lazy(() => import("./library/Library"));
const Students = React.lazy(() => import("./students/Students"));
const Classes = React.lazy(() => import("./classes/Classes"));
const Dormitories = React.lazy(() => import("./dormitories/Dormitories"));
const Register = React.lazy(() => import("./accounts/Register"));

export class Dashboard extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            breakpoint="md"
            collapsedWidth="0"
            onBreakpoint={broken => {
              if (broken) {
                this.setState({ collapsed: true });
              }
            }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <div className="mt-3 mb-3"></div>
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <IdcardOutlined />
                    <span> Students </span>
                  </span>
                }
              >
                <Menu.Item key="1">
                  {" "}
                  <Link to="/students">Students</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/students/table">Student List</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/students/add">Add Student</Link>
                </Menu.Item>
              </SubMenu>

              {/* Library SubMenu */}
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <ReadOutlined />
                    <span> Library </span>
                  </span>
                }
              >
                <Menu.Item key="5">
                  <Link to="/library">Library</Link>
                </Menu.Item>
                <Menu.Item key="6">
                  <Link to="/library/issuebookform">Issue Book</Link>
                </Menu.Item>
                <Menu.Item key="7">
                  <Link to="/library/bookinfoform">Add Book</Link>
                </Menu.Item>
                <Menu.Item key="8">
                  <Link to="/library/bookinstanceform">Add Book Instance</Link>
                </Menu.Item>
                <Menu.Item key="233">
                  <Link to="/library/bookinfotable">Book Table</Link>
                </Menu.Item>
              </SubMenu>

              {/* classes SubMenu */}
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <TeamOutlined />
                    <span> Classes </span>
                  </span>
                }
              >
                <Menu.Item key="9">
                  {" "}
                  <Link to="/classes">Classes</Link>
                </Menu.Item>
                <Menu.Item key="10">
                  {" "}
                  <Link to="/classes/streams">Streams</Link>
                </Menu.Item>
                <Menu.Item key="11">
                  {" "}
                  <Link to="/classes/classnumerals">Class Numerals</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{
                margin: 0,
                padding: 0,
                backgroundColor: "white"
              }}
            >
              <div className="pt-0 pl-2">
                {this.state.collapsed ? (
                  <MenuUnfoldOutlined
                    className="trigger"
                    onClick={this.toggle}
                    style={{ margin: 0, padding: 0, fontSize: "18px" }}
                  />
                ) : (
                  <MenuFoldOutlined
                    className="trigger"
                    onClick={this.toggle}
                    style={{ margin: 0, padding: 0, fontSize: "18px" }}
                  />
                )}
              </div>
            </Header>

            <Content
              className="mt-3 px-4"
              style={{
                margin: "2px ",

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
      </Router>
    );
  }
}

export default Dashboard;
