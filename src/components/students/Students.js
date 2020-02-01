import React, { Component, Fragment } from "react";

import { Link, Route, Switch } from "react-router-dom";

import StudentsList from "./StudentsList";
import StudentsForm from "./StudentsForm";
import StudentsTable from "./StudentsTable";

export class Students extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/students" component={LibraryDashboard} />
          <Route exact path="/students/table" component={StudentsTable} />
          <Route exact path="/students/add" component={StudentsForm} />
          <Route exact path="/students/list" component={StudentsList} />
        </Switch>
      </Fragment>
    );
  }
}

export default Students;
