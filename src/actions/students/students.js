import axios from "axios";
import { GET_STUDENTS } from "./types";

// GET STUDENTS
export const getStudents = () => dispatch => {
  axios
    .get("api/students/")
    .then(res => {
      dispatch({ type: GET_STUDENTS, payload: res.data });
    })
    .catch(err => console.log(err));
};
