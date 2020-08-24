import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import * as serviceWorker from "./serviceWorker";
import App from "./App";

Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.NODE_ENV
});

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.register();
