import axios from "axios";
import { URL } from "../url";
import { GET_BOOKS } from "./types";
import { createMessage, returnErrors } from "../messages";
import { tokenConfig } from "../auth/auth";

// GET BOOKS
export const getBooks = () => (dispatch, getState) => {
  axios
    .get(URL.concat("/api/books/"), tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_BOOKS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
