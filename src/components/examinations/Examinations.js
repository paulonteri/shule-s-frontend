import React, { Component, Fragment, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Spinner from "../common/Spinner";

const AddExamResults = React.lazy(() => import("./AddExamResPerStudent"));

const Examinations = () => {
  return (
    <Fragment>
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route
            exact
            path="/examinations/results/add"
            component={AddExamResults}
          />
        </Suspense>
      </Switch>
    </Fragment>
  );
};

export default Examinations;
