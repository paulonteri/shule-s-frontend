import React, { Component, Fragment, Suspense } from "react";
import Spinner from "../common/Spinner";
// TODO: Check on Lazy Loading
import { Route, Switch } from "react-router-dom";

const Error404 = React.lazy(() => import("../common/Error404"));
const StudentsDashboard = React.lazy(() => import("./StudentsDashboard"));
const StudentTable = React.lazy(() => import("./StudentTable"));
const StudentForm = React.lazy(() => import("./StudentForm"));
const StudentList = React.lazy(() => import("./StudentList"));

export class Students extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" component={StudentsDashboard} />
                    <Route
                        exact
                        path="/students"
                        component={StudentsDashboard}
                    />
                    <Route
                        exact
                        path="/students/table"
                        component={StudentTable}
                    />
                    <Route exact path="/students/add" component={StudentForm} />
                    <Route
                        exact
                        path="/students/list"
                        component={StudentList}
                    />
                    <Route component={Error404} />
                </Switch>
            </Fragment>
        );
    }
}

export default Students;
