import axios from "axios";

import {
  GET_CLASSNUMERAL,
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
        type: GET_CLASSNUMERAL,
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
      .post("api/classNumeral/")
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