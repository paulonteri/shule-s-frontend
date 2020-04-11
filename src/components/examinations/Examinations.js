import React, { Component, Fragment, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Spinner from "../common/Spinner";

const AddExamResPerStudent = React.lazy(() => import("./AddExamResPerStudent"));
const AddExamResPerClass = React.lazy(() => import("./AddExamResPerClass"));

const Examinations = () => {
    return (
        <Fragment>
            <Switch>
                <Suspense fallback={<Spinner />}>
                    <Route
                        exact
                        path="/examinations/results/add/student"
                        component={AddExamResPerStudent}
                    />
                    <Route
                        exact
                        path="/examinations/results/add/class"
                        component={AddExamResPerClass}
                    />
                </Suspense>
            </Switch>
        </Fragment>
    );
};

export default Examinations;
