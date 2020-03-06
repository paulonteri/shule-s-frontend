import React, { Component, Fragment, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Spinner from "../common/Spinner";

const LibraryDashboard = React.lazy(() => import("./LibraryDashboard"));
const BookInfoForm = React.lazy(() => import("./BookInfoForm"));
const BookInfoTable = React.lazy(() => import("./BookInfoTable"));
const BookInstanceForm = React.lazy(() => import("./BookInstanceForm"));
const IssueBookForm = React.lazy(() => import("./IssueBookForm"));

export class Library extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/library" component={LibraryDashboard} />
            <Route
              exact
              path="/library/bookinfotable"
              component={BookInfoTable}
            />
            <Route
              exact
              path="/library/bookinfoform"
              component={BookInfoForm}
            />
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
          </Suspense>
        </Switch>
      </Fragment>
    );
  }
}

export default Library;
