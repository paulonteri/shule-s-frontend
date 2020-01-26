import React, { Component, Fragment } from "react";
import StreamList from "./StreamList";
import StreamForm from "./StreamForm";

export class Classes extends Component {
  render() {
    return (
      <Fragment>
        <StreamList />
        <StreamForm />
      </Fragment>
    );
  }
}

export default Classes;
