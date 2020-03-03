import axios from "axios";
import { URL } from "../url";
import { ADD_STUDENT, GET_STUDENTS, DELETE_STUDENT } from "./types";

import { createMessage, returnErrors } from "../messages";
import { tokenConfig } from "../auth/auth";

// GET STUDENTS
export const getStudents = () => (dispatch, getState) => {
  axios
    .get(URL.concat("/api/students/"), tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_STUDENTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// ADD STUDENT
export const addStudent = student => (dispatch, getState) => {
  axios
    .post(URL.concat("/api/students/"), student, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addStudent: "Student Added" }));
      dispatch({
        type: ADD_STUDENT,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE STUDENT
export const deleteStudent = student_id => (dispatch, getState) => {
  axios
    .delete(
      `http://35.184.199.163:8000/api/students/${student_id}`,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch(createMessage({ deleteStudent: "Student Deleted!" }));
      dispatch({
        type: DELETE_STUDENT,
        payload: student_id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
