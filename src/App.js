import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
// import logo from "./logo.svg";

import Header from "./components/layout/library/Header";

import Dashboard from "./components/library/Dashboard";

function App() {
  return (
    <Fragment>
      <Header />
      <Dashboard />
      <p>School App</p>
    </Fragment>
  );
}

// export default App;
ReactDOM.render(<App />, document.getElementById("app"));
