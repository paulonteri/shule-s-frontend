import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
// import * as serviceWorker from "../serviceWorker";

import Library from "./library/Library";
import Alerts from "../layout/Alerts";
import Students from "./students/Students";

import { Provider } from "react-redux";
import store from "../store";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// Alerts Options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <Alerts />
            <Students />
            <Library />
            <p>App.js</p>
          </AlertProvider>
        </Fragment>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

// serviceWorker.unregister();
