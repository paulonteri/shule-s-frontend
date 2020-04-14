import React, { Component, Fragment, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Spinner from "../common/Spinner";

const AddAssignment = React.lazy(() => import("./AddAssignment"));
const Error404 = React.lazy(() => import("../common/Error404"));

const Assignments = () => {
    return (
        <Fragment>
            <Switch>
                <Suspense fallback={<Spinner />}>
                    <Route
                        exact
                        path="/assignments/add"
                        component={AddAssignment}
                    />
                    <Route component={Error404} />
                </Suspense>
            </Switch>
        </Fragment>
    );
};

export default Assignments;
