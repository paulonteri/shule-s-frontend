import axios from "axios";
import { URL } from "../url";
import { createMessage, returnErrors } from "../messages";

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_LOADING,
} from "./types";

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    //
    var tkn = tokenConfig(getState);
    if (tkn && tkn.headers && tkn.headers.Authorization) {
        // User Loading
        dispatch({ type: USER_LOADING });
        axios
            .get(URL.concat("/api/v2.0/auth/user"), tkn)
            .then((res) => {
                dispatch({
                    type: USER_LOADED,
                    payload: res.data,
                });
            })
            .catch((err) => {
                dispatch({
                    type: AUTH_ERROR,
                });
            });
    } else {
        dispatch({ type: AUTH_ERROR });
    }
};

///// LOGIN USER /////
export const login = (username, password) => (dispatch) => {
    dispatch({ type: LOGIN_LOADING });
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    // Request Body (change to string)
    const body = JSON.stringify({ username: username, password: password });
    axios
        .post(URL.concat("/api/v2.0/auth/login"), body, config)
        .then((res) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch(createMessage({ loginFail: "Login Failed" }));
            dispatch({
                type: LOGIN_FAIL,
            });
        });
};

///// REGISTER USER /////
export const register = ({ username, email, password }) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    // Request Body (change to string)
    const body = JSON.stringify({ username, email, password });
    axios
        .post(URL.concat("/api/v2.0/auth/register"), body, config)
        .then((res) => {
            dispatch(createMessage({ registerUser: "User Regisered" }));
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTER_FAIL,
            });
        });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    axios
        .post(URL.concat("/api/v2.0/auth/logout/"), null, tokenConfig(getState))
        .then((res) => {
            dispatch({ type: "CLEAR_ALL" });
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
    // Headers
    const config = { headers: { "Content-Type": "application/json" } };
    // Get token from state
    const token = getState().authReducer.token;
    // If token, add to headers config
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
};
