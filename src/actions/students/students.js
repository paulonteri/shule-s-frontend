import axios from "axios";
import { GET_STUDENTS, DELETE_STUDENT } from "./types";
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

// DELETE STUDENT ACTION
export const deleteStudent = student_id => dispatch => {
  axios
    .delete(`api/students/${student_id}`)
    .then(res => {
      dispatch(createMessage({ deleteStudent: "Student Deleted!" }));
      dispatch({
        type: DELETE_STUDENT,
        payload: student_id
      });
    })
    .catch(err => console.log(err));
};
