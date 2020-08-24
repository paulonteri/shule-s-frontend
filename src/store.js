import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

function returnMiddleware() {
    if (process.env.NODE_ENV === "development") {
        const { createLogger } = require("redux-logger");
        const { composeWithDevTools } = require("redux-devtools-extension");

        const logger = createLogger({
            // ...options
        });

        middleware.push(logger);
        return composeWithDevTools(applyMiddleware(...middleware));
    } else {
        return applyMiddleware(...middleware);
    }
}

const store = createStore(rootReducer, initialState, returnMiddleware());

export default store;

// TODO:
// https://www.pluralsight.com/guides/code-splitting-your-redux-application
