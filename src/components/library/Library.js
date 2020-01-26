import React, { Component, Fragment } from "react";
import { Link, Route, Switch } from "react-router-dom";

import LibraryDashboard from "./LibraryDashboard";
import BooksTable from "./BooksTable";

export class Library extends Component {
  render() {
    return (
      <Fragment>
        {/* <LibraryDashboard /> */}
        <div>
          <Switch>
            <Route exact path="library/" component={LibraryDashboard} />
            <Route exact path="/library/bookstable" component={BooksTable} />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

export default Library;
