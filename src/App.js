import React, { useEffect, Suspense } from "react";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch";
import HashRouter from "react-router-dom/es/HashRouter";
import SpinnerFull from "./components/common/SpinnerFull";
import Provider from "react-redux/es/components/Provider";
import store from "./store";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import PrivateRoute from "./components/common/PrivateRoute";
import { loadUser } from "./actions/auth/auth";
import Alerts from "./components/common/Alerts";
import "./App.css";
const Dashboard = React.lazy(() => import("./layout/Dashboard"));
const Test = React.lazy(() => import("./components/common/Test"));
const Login = React.lazy(() => import("./components/accounts/Login"));

// Alerts Options
const alertOptions = {
    timeout: 3250,
    position: "top center"
};
function App() {
    // OnMount
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
                <HashRouter>
                    <Alerts />

                    <Suspense
                        fallback={<SpinnerFull info="Authenticating..." />}
                    >
                        <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/test" component={Test} />
                            <PrivateRoute path="/" component={Dashboard} />
                        </Switch>
                    </Suspense>
                </HashRouter>
            </AlertProvider>
        </Provider>
    );
}

export default App;
