import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import StudentsList from "./StudentsList";
import StudentsForm from "./StudentsForm";
import StudentsFor from "./StudentsF";

export class Students extends Component {
  render() {
    return (
      <Fragment>
        {/* <StudentsList /> */}
        <StudentsForm />
        <StudentsFor />
      </Fragment>
    );
  }
}

export default Students;
