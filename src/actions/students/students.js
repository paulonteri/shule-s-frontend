import axios from "axios";
import { URL } from "../url";
import {
    ADD_STUDENT,
    GET_STUDENTS_SUCCESS,
    DELETE_STUDENT,
    GET_STUDENTS_LOADING,
    GET_STUDENTS_FAILED,
    // TODO:
    // PATCH_STUDENT
    INVALIDATE_STUDENT_CACHE,
    VALIDATE_STUDENT_CACHE,
} from "./types";

import { cached_api } from "../cache";

import { createMessage, returnErrors } from "../messages";
import { tokenConfig } from "../auth/auth";

// GET STUDENTS
export const getStudents = () => (dispatch, getState) => {
    dispatch({ type: GET_STUDENTS_LOADING });
    var invalidate_stud_cache = getState().studentsReducer
        .invalidateStudentCache;
    var reqData = tokenConfig(getState);
    reqData.clearCacheEntry = invalidate_stud_cache;
    cached_api
        .get(`${URL}/api/v2.0/students/students/`, reqData)
        .then(async (res) => {
            dispatch({
                type: GET_STUDENTS_SUCCESS,
                payload: res.data,
            });
            if (invalidate_stud_cache) {
                dispatch({ type: VALIDATE_STUDENT_CACHE });
            }
        })
        .catch((err) => {
            dispatch({ type: GET_STUDENTS_FAILED });
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

// ADD STUDENT
export const addStudent = (student) => (dispatch, getState) => {
    axios
        .post(
            `${URL}/api/v2.0/students/students/`,
            student,
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch(createMessage({ addStudent: "Student Added" }));
            dispatch({
                type: ADD_STUDENT,
                payload: res.data,
            });
            dispatch({ type: INVALIDATE_STUDENT_CACHE });
        })
        .catch((err) =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// DELETE STUDENT
export const deleteStudent = (student_id) => (dispatch, getState) => {
    axios
        .delete(
            `${URL}/api/v2.0/students/students/${student_id}`,
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch(createMessage({ deleteStudent: "Student Deleted!" }));
            dispatch({
                type: DELETE_STUDENT,
                payload: student_id,
            });
            dispatch({ type: INVALIDATE_STUDENT_CACHE });
        })
        .catch((err) =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};
