import axios from "axios";
import { URL } from "../url";
import {
    GET_ASSIGNMENTS_FAILED,
    GET_ASSIGNMENTS_LOADING,
    GET_ASSIGNMENTS_SUCCESS,
    ADD_ASSIGNMENT_FAILED,
    ADD_ASSIGNMENT_LOADING,
    ADD_ASSIGNMENT_SUCCESS
} from "./types";
import { createMessage, returnErrors } from "../messages";
import { tokenConfig } from "../auth/auth";

export const getAssignments = () => (dispatch, getState) => {
    // GET ALL ASSIGNMENTS
    dispatch({ type: GET_ASSIGNMENTS_LOADING });
    axios
        .get(`${URL}/api/v2.0/assignments/assignments/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_ASSIGNMENTS_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({ type: GET_ASSIGNMENTS_FAILED });
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const addAssignment = assignment => (dispatch, getState) => {
    // SAVE ASSIGNMENT
    dispatch({ type: ADD_ASSIGNMENT_LOADING });
    axios
        .post(
            `${URL}/api/v2.0/assignments/assignments/`,
            assignment,
            tokenConfig(getState)
        )
        .then(res => {
            dispatch(createMessage({ addBook: "Assignment Saved" }));
            dispatch({
                type: ADD_ASSIGNMENT_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({ type: ADD_ASSIGNMENT_FAILED });
            dispatch(returnErrors(err.response.data, err.response.status));
            console.log(err.response.data);
        });
};
