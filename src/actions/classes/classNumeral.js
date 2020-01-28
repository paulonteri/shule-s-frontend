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
