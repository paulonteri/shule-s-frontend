import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";

const { SubMenu } = Menu;
const { Sider } = Layout;

import { Link } from "react-router-dom";

export class AppSider extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    return (
      <Sider
        // collapsible
        // collapsed={this.state.collapsed}
        // onCollapse={this.onCollapse}
        breakpoint="md"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
      >
        <div className="logo" />

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <div className="mt-3 mb-3"></div>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                <span> Students </span>
              </span>
            }
          >
            <Menu.Item key="1">
              {" "}
              <Link to="/">Students</Link>
            </Menu.Item>
            <Menu.Item key="2">option2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </SubMenu>

          {/* Library SubMenu */}
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="laptop" />
                <span> Library </span>
              </span>
            }
          >
            <Menu.Item key="5">
              <Link to="/library">Library</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/library/bookstable">Books Table</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/library/addbook">Add Book</Link>
            </Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>

          {/* classes SubMenu */}
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="user" />
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
            <Menu.Item key="12">option4</Menu.Item>
          </SubMenu>

          {/* Others */}
          <Menu.Item key="31">
            <Icon type="user" />
            <span className="nav-text">nav 1</span>
          </Menu.Item>

          <Menu.Item key="32">
            <Icon type="video-camera" />
            <span className="nav-text">nav 2</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default AppSider;
