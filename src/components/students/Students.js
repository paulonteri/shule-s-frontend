import React, { Component, Fragment } from "react";

import StudentsList from "./StudentsList";

export class Students extends Component {
  render() {
    return (
      <Fragment>
        <StudentsList />
      </Fragment>
    );
  }
}

export default Students;
