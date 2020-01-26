import React, { Component } from "react";
import { Layout, Icon } from "antd";

const { Header } = Layout;

export class AppHeader extends Component {
  render() {
    return (
      <Header style={{ background: "#fff", padding: 0 }}>
        <p>School</p>
      </Header>
    );
  }
}

export default AppHeader;
