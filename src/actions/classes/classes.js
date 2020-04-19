import axios from "axios";
import { URL } from "../url";

import {
    GET_CLASSES_SUCCESS,
    ADD_CLASS_SUCCESS,
    DELETE_CLASS_SUCCESS,
    GET_CLASSES_FAIL,
    GET_CLASSES_LOADING
} from "./types";

import { createMessage, returnErrors } from "../messages";
import { tokenConfig } from "../auth/auth";

// GET CLASSES
export const getClasses = () => (dispatch, getState) => {
    dispatch({ type: GET_CLASSES_LOADING });
    axios
        .get(`${URL}/api/v2.0/academics/classes/"), tokenConfig(getState)`)
        .then(res => {
            dispatch({
                type: GET_CLASSES_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({ type: GET_CLASSES_FAIL });
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};
