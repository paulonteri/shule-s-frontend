import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import LibraryDashboard from "./LibraryDashboard";
import BookInfoTable from "./BookInfoTable";
import BookInfoForm from "./BookInfoForm";
import BookInstanceForm from "./BookInstanceForm";
import IssueBookForm from "./IssueBookForm";
import Error404 from "../common/Error404";

export class Library extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/library" component={LibraryDashboard} />
          <Route exact path="/library/bookinfotable" component={BookInfoTable} />
          <Route exact path="/library/bookinfoform" component={BookInfoForm} />
          <Route
            exact
            path="/library/bookinstanceform"
            component={BookInstanceForm}
          />
          <Route
            exact
            path="/library/issuebookform"
            component={IssueBookForm}
          />
          <Route component={Error404}/>
        </Switch>
      </Fragment>
    );
  }
}

export default Library;
