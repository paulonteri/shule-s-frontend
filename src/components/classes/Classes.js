import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Spinner from "../common/Spinner";

const ClassesDashboard = React.lazy(() => import("./ClassesDashboard"));
const StreamList = React.lazy(() => import("./StreamList"));
const StreamForm = React.lazy(() => import("./StreamForm"));
const Streams = React.lazy(() => import("./Streams"));
const ClassNList = React.lazy(() => import("./ClassNList"));
const ClassNForm = React.lazy(() => import("./ClassNForm"));
const ClassNumerals = React.lazy(() => import("./ClassNumerals"));
const Error404 = React.lazy(() => import("../common/Error404"));
const AddClassesForm = React.lazy(() => import("./AddClassesForm"));

const Classes = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <Switch>
                <Route exact path="/classes" component={ClassesDashboard} />
                <Route exact path="/classes/add" component={AddClassesForm} />
                <Route
                    exact
                    path="/classes/classnumerallist"
                    component={ClassNList}
                />
                <Route
                    exact
                    path="/classes/classnumeralform"
                    component={ClassNForm}
                />
                <Route
                    exact
                    path="/classes/classnumerals"
                    component={ClassNumerals}
                />
                <Route exact path="/classes/streams" component={Streams} />
                <Route
                    exact
                    path="/classes/streamlist"
                    component={StreamList}
                />
                <Route
                    exact
                    path="/classes/streamform"
                    component={StreamForm}
                />
                <Route component={Error404} />
            </Switch>
        </Suspense>
    );
};

export default Classes;
