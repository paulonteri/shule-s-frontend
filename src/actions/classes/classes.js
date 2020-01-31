import axios from "axios";

import { GET_CLASSES, ADD_CLASS, DELETE_CLASS } from "./types";

import { createMessage, returnErrors } from "../messages";

// GET CLASSES
export const getClasses = () => dispatch => {
    axios
      .get("api/classes/")
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
