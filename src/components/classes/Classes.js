import React, { Component, Fragment } from "react";
import { Link, Route, Switch } from "react-router-dom";

import ClassesDashboard from "./ClassesDashboard";
import StreamList from "./StreamList";
import StreamForm from "./StreamForm";
import Streams from "./Streams";

export class Classes extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/classes" component={ClassesDashboard} />
          <Route exact path="/classes/streams" component={Streams} />
          <Route exact path="/classes/streamlist" component={StreamList} />
          <Route exact path="/classes/streamform" component={StreamForm} />
        </Switch>
      </Fragment>
    );
  }
}

export default Classes;