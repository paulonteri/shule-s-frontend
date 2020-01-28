import axios from "axios";

import {
  GET_CLASSNUMERALS,
  ADD_CLASSNUMERAL,
  DELETE_CLASSNUMERAL
} from "./types";
import { createMessage, returnErrors } from "../messages";

// GET CLASS NUMERAL
export const getClassNumeral = () => dispatch => {
  axios
    .get("api/classNumeral/")
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
export const addClassNumeral = classNumeral => dispatch => {
  axios
    .post("api/classNumeral/", classNumeral)
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
export const deleteClassNumeral = name => dispatch => {
  axios
    .delete(`api/classNumeral/${name}`)
    .then(res => {
      dispatch({
        type: DELETE_CLASSNUMERAL,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
