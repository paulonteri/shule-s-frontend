import Dashboard from "./Dashboard";

import React, { Component, Fragment } from "react";

export class Library extends Component {
  render() {
    return (
      <Fragment>
        <Dashboard />
        <p>Library.js</p>
      </Fragment>
    );
  }
}

export default Library;
