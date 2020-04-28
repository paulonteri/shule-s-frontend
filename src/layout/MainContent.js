import React, { Suspense } from "react";
import PrivateRoute from "../components/common/PrivateRoute";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch";
import Redirect from "react-router-dom/es/Redirect";
import HashRouter from "react-router-dom/es/HashRouter";
import Spinner from "../components/common/Spinner";
import Homepage from "./Homepage";
const Error404 = React.lazy(() => import("../components/common/Error404"));
const Library = React.lazy(() => import("../components/library/Library"));
const Students = React.lazy(() => import("../components/students/Students"));
const Classes = React.lazy(() => import("../components/classes/Classes"));
const Dormitories = React.lazy(() =>
    import("../components/dormitories/Dormitories")
);
const Examinations = React.lazy(() =>
    import("../components/examinations/Examinations")
);
const Register = React.lazy(() => import("../components/accounts/Register"));
const Assignments = React.lazy(() =>
    import("../components/assignments/Assignments")
);

export const MainContent = () => {
    return (
        <HashRouter>
            <Suspense fallback={<Spinner />}>
                <Switch>
                    <PrivateRoute exact path="/" component={Homepage} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/spinner" component={Spinner} />
                    <PrivateRoute path="/students" component={Students} />
                    <PrivateRoute path="/library" component={Library} />
                    <PrivateRoute path="/classes" component={Classes} />
                    <PrivateRoute path="/dorms" component={Dormitories} />
                    <PrivateRoute
                        path="/examinations"
                        component={Examinations}
                    />
                    <PrivateRoute path="/assignments" component={Assignments} />
                    <Route path="/login" Redirect>
                        <Redirect to="/" />
                    </Route>
                    <Route component={Error404} />
                </Switch>
            </Suspense>
        </HashRouter>
    );
};

export default MainContent;
