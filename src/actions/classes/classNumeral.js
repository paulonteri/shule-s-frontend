import axios from "axios";
import { URL } from "../url";
import { short_cached_api } from "../cache";

import {
    GET_CLASS_NUMERALS_SUCCESS,
    ADD_CLASS_NUMERAL_SUCCESS,
    DELETE_CLASS_NUMERAL_SUCCESS,
    ADD_CLASS_NUMERAL_LOADING,
    ADD_CLASS_NUMERAL_FAILED,
    GET_CLASS_NUMERALS_LOADING,
    GET_CLASS_NUMERALS_FAILED,
    DELETE_CLASS_NUMERAL_FAILED,
    DELETE_CLASS_NUMERAL_LOADING,
} from "./types";

import { createMessage, returnErrors } from "../messages";
import { tokenConfig } from "../auth/auth";

// GET CLASS NUMERAL
export const getClassNumeral = () => (dispatch, getState) => {
    dispatch({ type: GET_CLASS_NUMERALS_LOADING });
    short_cached_api
        .get(
            URL.concat("/api/v2.0/academics/classNumeral/"),
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch({
                type: GET_CLASS_NUMERALS_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: GET_CLASS_NUMERALS_FAILED });
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

// ADD CLASS NUMERAL
export const addClassNumeral = (classNumeral) => (dispatch, getState) => {
    dispatch({ type: ADD_CLASS_NUMERAL_LOADING });
    axios
        .post(
            URL.concat("/api/v2.0/academics/classNumeral/"),
            classNumeral,
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch(createMessage({ addClassNumeral: "Class Numeral Added" }));
            dispatch({
                type: ADD_CLASS_NUMERAL_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: ADD_CLASS_NUMERAL_FAILED });
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

// DELETE CLASS NUMERAL
export const deleteClassNumeral = (name) => (dispatch, getState) => {
    dispatch({ type: DELETE_CLASS_NUMERAL_LOADING });
    axios
        .delete(
            URL.concat(`/api/v2.0/academics/classNumeral/${name}`),
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch(
                createMessage({ deleteClassNumeral: "Class Numeral Deleted!" })
            );
            dispatch({
                type: DELETE_CLASS_NUMERAL_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: DELETE_CLASS_NUMERAL_FAILED });
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};
