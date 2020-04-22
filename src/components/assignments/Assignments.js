import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Spinner from "../common/Spinner";

const AddAssignment = React.lazy(() => import("./AddAssignment"));
const AssignmentsTable = React.lazy(() => import("./AssignmentsTable"));
const Error404 = React.lazy(() => import("../common/Error404"));

const Assignments = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <Switch>
                <Route exact path="/assignments" component={AddAssignment} />
                <Route
                    exact
                    path="/assignments/add"
                    component={AddAssignment}
                />
                <Route
                    exact
                    path="/assignments/all"
                    component={AssignmentsTable}
                />
                <Route component={Error404} />
            </Switch>
        </Suspense>
    );
};

export default Assignments;
