import axios from "axios";
import { URL } from "../url";
import {
  GET_ALL_ASSIGNMENT_FILES_FAILED,
  GET_ALL_ASSIGNMENT_FILES_LOADING,
  GET_ALL_ASSIGNMENT_FILES_SUCCESS,
  GET_ASSIGNMENT_FILE_FAILED,
  GET_ASSIGNMENT_FILE_LOADING,
  GET_ASSIGNMENT_FILE_SUCCESS,
  ADD_ASSIGNMENT_FILE_FAILED,
  ADD_ASSIGNMENT_FILE_LOADING,
  ADD_ASSIGNMENT_FILE_SUCCESS
} from "./types";
import { createMessage, returnErrors } from "../messages";
import { tokenConfig } from "../auth/auth";

export const getAllAssignmentFiles = () => (dispatch, getState) => {
  // GET ALL ASSIGNMENT_FILES
  dispatch({ type: GET_ALL_ASSIGNMENT_FILES_LOADING });
  axios
    .get(`${URL}/api/v2.0/assignments/files/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ALL_ASSIGNMENT_FILES_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: GET_ALL_ASSIGNMENT_FILES_FAILED });
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const getAssignmentFile = assignmentFile => (dispatch, getState) => {
  // GET ALL ASSIGNMENT_FILES
  dispatch({ type: GET_ASSIGNMENT_FILE_LOADING });
  axios
    .get(
      `${URL}/api/v2.0/assignments/files/${assignmentFile}/`,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: GET_ASSIGNMENT_FILE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: GET_ASSIGNMENT_FILE_FAILED });
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const addAssignmentFile = assignmentFile => (dispatch, getState) => {
  // SAVE ASSIGNMENT_FILE
  dispatch({ type: ADD_ASSIGNMENT_FILE_LOADING });
  axios
    .post(
      `${URL}/api/v2.0/assignments/files/`,
      assignmentFile,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch(createMessage({ addBook: "Class Results Saved" }));
      dispatch({
        type: ADD_ASSIGNMENT_FILE_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: ADD_ASSIGNMENT_FILE_FAILED });
      dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err.response.data);
    });
};
