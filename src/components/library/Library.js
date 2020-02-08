import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import LibraryDashboard from "./LibraryDashboard";
import BooksTable from "./BooksTable";
import BookForm from "./BookForm";
import BookInstanceForm from "./BookInstanceForm"

export class Library extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/library" component={LibraryDashboard} />
          <Route exact path="/library/bookstable" component={BooksTable} />
          <Route exact path="/library/addbook" component={BookForm} />
          <Route exact path="/library/bookinstanceform" component={BookInstanceForm} />
        </Switch>
      </Fragment>
    );
  }
}

export default Library;
