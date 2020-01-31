import React, { Component, Fragment } from "react";

import StudentsList from "./StudentsList";
import StudentsForm from "./StudentsForm";

export class Students extends Component {
  render() {
    return (
      <Fragment>
        {/* <StudentsList /> */}
        <StudentsForm />
      </Fragment>
    );
  }
}

export default Students;
