import React, { Component, Fragment } from "react";

import { Link, Route, Switch } from "react-router-dom";

import StudentList from "./StudentList";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";
import StudentsDashboard from "./StudentsDashboard";

export class Students extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={StudentsDashboard} />
          <Route exact path="/students" component={StudentsDashboard} />
          <Route exact path="/students/table" component={StudentTable} />
          <Route exact path="/students/add" component={StudentForm} />
          <Route exact path="/students/list" component={StudentList} />
        </Switch>
      </Fragment>
    );
  }
}

export default Students;
