import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
// import * as serviceWorker from "../serviceWorker";

import Dashboard from "./library/Dashboard";

import { Provider } from "react-redux";
import store from "../store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <p>App.js</p>
          <Dashboard />
        </Fragment>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

// serviceWorker.unregister();
