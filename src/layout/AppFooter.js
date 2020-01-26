import React, { Component } from "react";
import { Layout } from "antd";

const { Footer } = Layout;

export class AppFooter extends Component {
  render() {
    return (
      <Footer style={{ textAlign: "center" }}>
        Paul Onteri ©2020 Created by Paul Onteri
      </Footer>
    );
  }
}

export default AppFooter;
