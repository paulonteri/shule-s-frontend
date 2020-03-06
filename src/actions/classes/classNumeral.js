import axios from "axios";
import { URL } from "../url";

import {
  GET_CLASSNUMERALS,
  ADD_CLASSNUMERAL,
  DELETE_CLASSNUMERAL
} from "./types";

import { createMessage, returnErrors } from "../messages";
import { tokenConfig } from "../auth/auth";

// GET CLASS NUMERAL
export const getClassNumeral = () => (dispatch, getState) => {
  axios
    .get(URL.concat("/api/academics/classNumeral/"), tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_CLASSNUMERALS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// ADD CLASS NUMERAL
export const addClassNumeral = classNumeral => (dispatch, getState) => {
  axios
    .post(
      URL.concat("/api/academics/classNumeral/"),
      classNumeral,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch(createMessage({ addClassNumeral: "Class Numeral Added" }));
      dispatch({
        type: ADD_CLASSNUMERAL,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE CLASS NUMERAL
export const deleteClassNumeral = name => (dispatch, getState) => {
  axios
    .delete(
      URL.concat(`/api/academics/classNumeral/${name}`),
      tokenConfig(getState)
    )
    .then(res => {
      dispatch(createMessage({ deleteClassNumeral: "Class Numeral Deleted!" }));
      dispatch({
        type: DELETE_CLASSNUMERAL,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
