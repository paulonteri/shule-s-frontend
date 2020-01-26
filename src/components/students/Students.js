import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import StudentsList from "./StudentsList";

export class Students extends Component {
  render() {
    return (
      <Fragment>
        <StudentsList />
        <button>
          <Link to="/library">Library</Link>
        </button>
      </Fragment>
    );
  }
}

export default Students;
