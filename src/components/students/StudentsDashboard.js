import React, { Component } from "react";

import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";

export class StudentsDashboard extends Component {
  render() {
    return (
      <div className="container-fluid-fluid ">
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
    );
  }
}

export default StudentsDashboard;
