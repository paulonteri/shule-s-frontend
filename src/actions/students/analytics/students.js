import axios from "axios";
import { URL } from "../../url";
import {
    GET_STUDENT_ANALYTICS_SUCCESS,
    GET_STUDENT_ANALYTICS_LOADING,
    GET_STUDENT_ANALYTICS_FAILED
} from "./types";

import { returnErrors } from "../../messages";
import { tokenConfig } from "../../auth/auth";

// GET STUDENTS
export const getStudentAnalytics = () => (dispatch, getState) => {
    dispatch({ type: GET_STUDENT_ANALYTICS_LOADING });
    axios
        .get(
            `${URL}/api/v2.0/students/analytics/general`,
            tokenConfig(getState)
        )
        .then(res => {
            dispatch({
                type: GET_STUDENT_ANALYTICS_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({ type: GET_STUDENT_ANALYTICS_FAILED });
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};
