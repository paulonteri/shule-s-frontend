import axios from "axios";
import { URL } from "../url";

import { GET_SUBJECTS, ADD_SUBJECT, DELETE_SUBJECT } from "./types";
import { createMessage, returnErrors } from "../messages";
import { tokenConfig } from "../auth/auth";

// GET SUBJECTS ACTION
export const getSubjects = () => (dispatch, getState) => {
  axios
    .get(URL.concat("/api/v2.0/academics/subject/"), tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_SUBJECTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// ADD SUBJECT ACTION
export const addSubject = subject => (dispatch, getState) => {
  axios
    .post(
      URL.concat("/api/v2.0/academics/subject/"),
      subject,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch(createMessage({ addSubject: "Subject Added" }));
      dispatch({
        type: ADD_SUBJECT,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE SUBJECT ACTION
export const deleteSubject = name => (dispatch, getState) => {
  axios
    .delete(
      URL.concat(`/api/v2.0/academics/subject/${name}`),
      tokenConfig(getState)
    )
    .then(res => {
      dispatch(createMessage({ deleteSubject: "Subject Deleted" }));
      dispatch({
        type: DELETE_SUBJECT,
        payload: name
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
