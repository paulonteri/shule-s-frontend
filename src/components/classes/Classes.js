import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import ClassesDashboard from "./ClassesDashboard";
import StreamList from "./StreamList";
import StreamForm from "./StreamForm";
import Streams from "./Streams";
import ClassNList from "./ClassNList";
import ClassNForm from "./ClassNForm";
import ClassNumerals from "./ClassNumerals";

export class Classes extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/classes" component={ClassesDashboard} />
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
          <Route exact path="/classes/streamlist" component={StreamList} />
          <Route exact path="/classes/streamform" component={StreamForm} />
        </Switch>
      </Fragment>
    );
  }
}

export default Classes;
