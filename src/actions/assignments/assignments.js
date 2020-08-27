import axios from "axios";
import { URL } from "../url";
import { short_cached_api } from "../cache";
import {
    GET_ASSIGNMENTS_FAILED,
    GET_ASSIGNMENTS_LOADING,
    GET_ASSIGNMENTS_SUCCESS,
    DELETE_ASSIGNMENT_FAILED,
    DELETE_ASSIGNMENT_LOADING,
    DELETE_ASSIGNMENT_SUCCESS,
    PATCH_ASSIGNMENT_FAILED,
    PATCH_ASSIGNMENT_LOADING,
    PATCH_ASSIGNMENT_SUCCESS,
    ADD_ASSIGNMENT_FAILED,
    ADD_ASSIGNMENT_LOADING,
    ADD_ASSIGNMENT_SUCCESS,
} from "./types";
import { createMessage, returnErrors } from "../messages";
import { tokenConfig } from "../auth/auth";

export const getAssignments = () => (dispatch, getState) => {
    // GET ALL ASSIGNMENTS
    dispatch({ type: GET_ASSIGNMENTS_LOADING });
    short_cached_api
        .get(`${URL}/api/v2.0/assignments/assignments/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_ASSIGNMENTS_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: GET_ASSIGNMENTS_FAILED });
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const addAssignment = (assignment) => (dispatch, getState) => {
    // SAVE ASSIGNMENT
    dispatch({ type: ADD_ASSIGNMENT_LOADING });
    axios
        .post(
            `${URL}/api/v2.0/assignments/assignments/`,
            assignment,
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch(createMessage({ addBook: "Assignment Saved" }));
            dispatch({
                type: ADD_ASSIGNMENT_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: ADD_ASSIGNMENT_FAILED });
            dispatch(returnErrors(err.response.data, err.response.status));
            console.log(err.response.data);
        });
};

export const patchAssignment = (id, assignment) => (dispatch, getState) => {
    // PATCH ASSIGNMENT
    dispatch({ type: PATCH_ASSIGNMENT_LOADING });
    axios
        .patch(
            `${URL}/api/v2.0/assignments/assignments/${id}`,
            assignment,
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch(createMessage({ addBook: "Assignment Updated" }));
            dispatch({
                type: PATCH_ASSIGNMENT_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: PATCH_ASSIGNMENT_FAILED });
            dispatch(returnErrors(err.response.data, err.response.status));
            console.log(err.response.data);
        });
};

export const deleteAssignment = (id, assignment) => (dispatch, getState) => {
    // DELETE ASSIGNMENT
    dispatch({ type: DELETE_ASSIGNMENT_LOADING });
    axios
        .delete(
            `${URL}/api/v2.0/assignments/assignments/${id}`,
            assignment,
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch(createMessage({ addBook: "Assignment Deleted" }));
            dispatch({
                type: DELETE_ASSIGNMENT_SUCCESS,
                payload: id,
            });
        })
        .catch((err) => {
            dispatch({ type: DELETE_ASSIGNMENT_FAILED });
            dispatch(returnErrors(err.response.data, err.response.status));
            console.log(err.response.data);
        });
};
