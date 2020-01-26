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
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo" />

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
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
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>

          <Menu.Item key="1">
            <Icon type="user" />
            <span className="nav-text">nav 1</span>
          </Menu.Item>

          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span className="nav-text">nav 2</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default AppSider;
