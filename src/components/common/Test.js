import React, { Component } from "react";

import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  MenuOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

class SiderDemo extends React.Component {
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
      <Layout>
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
            <Menu.Item key="1">
              <UserOutlined />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <VideoCameraOutlined />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <UploadOutlined />
              <span>nav 3</span>
            </Menu.Item>
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
            className="site-layout-background"
            style={{
              minHeight: 280
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;
