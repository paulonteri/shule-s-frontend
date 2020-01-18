import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "../serviceWorker";

import Dashboard from "../views/library/Dashboard";

import { Provider } from "react-redux";
import store from "../store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <p>Hello World</p>
          <Dashboard />
        </Fragment>
      </Provider>
    );
  }
}
serviceWorker.register();

ReactDOM.render(<App />, document.getElementById("app"));
