import axios from "axios";
import { URL } from "../url";
import {
  GET_EXAMS_SUCCESS,
  GET_EXAMS_LOADING,
  GET_EXAMS_FAILED,
  GET_EXAMRESULTS_ALL_SUCCESS,
  GET_EXAMRESULTS_ALL_LOADING,
  GET_EXAMRESULTS_ALL_FAILED,
  ADD_EXAMRESULTS_PER_CLASS_LOADING,
  ADD_EXAMRESULTS_PER_CLASS_SUCCESS,
  ADD_EXAMRESULTS_PER_CLASS_FAILED,
  ADD_EXAMRESULTS_PER_STUDENT_LOADING,
  ADD_EXAMRESULTS_PER_STUDENT_SUCCESS,
  ADD_EXAMRESULTS_PER_STUDENT_FAILED
} from "./types";
import { createMessage, returnErrors } from "../messages";
import { tokenConfig } from "../auth/auth";

export const getExams = () => (dispatch, getState) => {
  // GET ALL EXAMS
  dispatch({ type: GET_EXAMS_LOADING });
  axios
    .get(URL.concat("/api/v2.0/exams/results/get/all/"), tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_EXAMS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: GET_EXAMS_FAILED });
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const getExamResultsAll = () => (dispatch, getState) => {
  // GET ALL EXAM RESULTS
  dispatch({ type: GET_EXAMRESULTS_ALL_LOADING });
  axios
    .get(URL.concat("/api/v2.0/exams/results/get/all/"), tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_EXAMRESULTS_ALL_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: GET_EXAMRESULTS_ALL_FAILED });
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const addExamResultsPerClass = results => (dispatch, getState) => {
  // SAVE EXAM RESULTS PER CLASS
  dispatch({ type: ADD_EXAMRESULTS_PER_CLASS_LOADING });
  axios
    .post(
      URL.concat("/api/v2.0/exams/results/save/class/"),
      results,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch(createMessage({ addBook: "Class Results Saved" }));
      dispatch({
        type: ADD_EXAMRESULTS_PER_CLASS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: ADD_EXAMRESULTS_PER_CLASS_FAILED });
      dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err.response.data);
    });
};

export const addExamResultsPerStudent = results => (dispatch, getState) => {
  // SAVE EXAM RESULTS PER STUDENT
  dispatch({ type: ADD_EXAMRESULTS_PER_STUDENT_LOADING });
  axios
    .post(
      URL.concat("/api/v2.0/exams/results/save/student/"),
      results,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch(createMessage({ addBook: "Student Results Saved" }));
      dispatch({
        type: ADD_EXAMRESULTS_PER_STUDENT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: ADD_EXAMRESULTS_PER_STUDENT_FAILED });
      dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err.response.data);
    });
};
