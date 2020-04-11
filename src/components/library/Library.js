import React, { Component, Fragment, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Spinner from "../common/Spinner";

const LibraryDashboard = React.lazy(() => import("./LibraryDashboard"));
const BookInstanceForm = React.lazy(() => import("./BookInstanceForm"));
const BookInfoDetail = React.lazy(() => import("./BookInfoDetail"));
const BookInfoTable = React.lazy(() => import("./BookInfoTable"));
const IssueBookForm = React.lazy(() => import("./IssueBookForm"));
const BookInfoForm = React.lazy(() => import("./BookInfoForm"));

export class Library extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Suspense fallback={<Spinner />}>
                        <Route
                            exact
                            path="/library"
                            component={LibraryDashboard}
                        />
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
                            path="/library/bookinfodetail/:book_id"
                            component={BookInfoDetail}
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
