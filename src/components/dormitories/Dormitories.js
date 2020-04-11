import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import DormList from "./DormList";
import DormitoriesDashboard from "./DormitoriesDashboard";
import Error404 from "../common/Error404";

export class Dormitories extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route
                        exact
                        path="/dorms"
                        component={DormitoriesDashboard}
                    />
                    <Route exact path="/dorms/list" component={DormList} />
                    <Route component={Error404} />
                </Switch>
            </Fragment>
        );
    }
}

export default Dormitories;
