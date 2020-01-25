import axios from "axios";
import { GET_STUDENTS } from "./types";
import { createMessage, returnErrors } from "../messages";

export const getStudents = () => dispatch => {
  axios
    .get("api/students/")
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

