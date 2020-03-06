import React, { Component, Fragment } from "react";

import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";

export class StudentsDashboard extends Component {
  render() {
    return (
      <Fragment>
        <div className="container card card-body shadow rounded mt-1 mb-4">
          <p class="text-danger">Caution! Developer at work.</p>
          <p class="text-danger">
            Handle with care. This web app is still under construction.
          </p>

          <div className="row">
            <StudentForm />
          </div>
          <div className="row">
            <StudentTable />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default StudentsDashboard;
