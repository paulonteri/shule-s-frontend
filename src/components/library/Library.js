import Dashboard from "./Dashboard";
import Alert from "../../layout/Alert";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import React, { Component, Fragment } from "react";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

export class Library extends Component {
  render() {
    return (
      <Fragment>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Dashboard />
          <Alert />
          <p>Library.js</p>
        </AlertProvider>
      </Fragment>
    );
  }
}

export default Library;
