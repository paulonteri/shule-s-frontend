import axios from "axios";
import { URL } from "../url";
import { short_cached_api } from "../cache";

import {
    GET_CLASSES_SUCCESS,
    ADD_CLASS_SUCCESS,
    ADD_CLASS_LOADING,
    ADD_CLASS_FAILED,
    PATCH_CLASS_SUCCESS,
    PATCH_CLASS_LOADING,
    PATCH_CLASS_FAILED,
    DELETE_CLASS_SUCCESS,
    DELETE_CLASS_LOADING,
    DELETE_CLASS_FAILED,
    GET_CLASSES_FAILED,
    GET_CLASSES_LOADING,
} from "./types";

import { createMessage, returnErrors } from "../messages";
import { tokenConfig } from "../auth/auth";

// GET CLASSES
export const getClasses = () => (dispatch, getState) => {
    dispatch({ type: GET_CLASSES_LOADING });
    short_cached_api
        .get(`${URL}/api/v2.0/academics/classes/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_CLASSES_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: GET_CLASSES_FAILED });
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

// ADD CLASS
export const addClass = (classs) => (dispatch, getState) => {
    dispatch({ type: ADD_CLASS_LOADING });
    axios
        .post(
            `${URL}/api/v2.0/academics/classes/`,
            classs,
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch(createMessage({ addClassNumeral: "Class Added" }));
            dispatch({
                type: ADD_CLASS_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: ADD_CLASS_FAILED });
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const patchClass = (id, classs) => (dispatch, getState) => {
    // PATCH CLASS
    dispatch({ type: PATCH_CLASS_LOADING });
    axios
        .patch(
            `${URL}/api/v2.0/academics/classes/${id}`,
            classs,
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch(createMessage({ addBook: "Class Updated" }));
            dispatch({
                type: PATCH_CLASS_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: PATCH_CLASS_FAILED });
            dispatch(returnErrors(err.response.data, err.response.status));
            console.log(err.response.data);
        });
};

// DELETE CLASS NUMERAL
export const deleteClass = (id) => (dispatch, getState) => {
    dispatch({ type: DELETE_CLASS_LOADING });
    axios
        .delete(
            URL.concat(`/api/v2.0/academics/classes/${id}`),
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch(
                createMessage({ deleteClassNumeral: "Class Numeral Deleted!" })
            );
            dispatch({
                type: DELETE_CLASS_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: DELETE_CLASS_FAILED });
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};
