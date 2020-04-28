import React, { Component } from "react";
import { Layout } from "antd";

const { Footer } = Layout;

export class AppFooter extends Component {
    render() {
        return <Footer style={{ textAlign: "center" }}>ShuleSuite</Footer>;
    }
}

export default AppFooter;
