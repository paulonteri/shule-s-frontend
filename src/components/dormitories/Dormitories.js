import React, { Component, Fragment } from "react";
import { Link, Route, Switch } from "react-router-dom";

import DormList from "./DormList";
import DormitoriesDashboard from "./DormitoriesDashboard";

export class Dormitories extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/dorms" component={DormitoriesDashboard} />
          <Route exact path="/dorms/list" component={DormList} />
        </Switch>
      </Fragment>
    );
  }
}

export default Dormitories;
