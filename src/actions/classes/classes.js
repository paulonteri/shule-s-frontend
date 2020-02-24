import axios from "axios";

import { GET_CLASSES, ADD_CLASS, DELETE_CLASS } from "./types";

import { createMessage, returnErrors } from "../messages";
import { tokenConfig } from "../auth/auth";

// GET CLASSES
export const getClasses = () => (dispatch, getState) => {
  axios
    .get("http://0.0.0.0:8000/api/classes/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_CLASSES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
