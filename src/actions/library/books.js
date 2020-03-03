import axios from "axios";
import { URL } from "../url";
import {
  GET_BOOKS,
  DELETE_BOOK,
  ADD_BOOK,
  GET_BOOKISSUED,
  DELETE_BOOKISSUED,
  ADD_BOOKISSUED,
  GET_BOOKINSTANCE,
  ADD_BOOKINSTANCE,
  DELETE_BOOKINSTANCE
} from "./types";
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

// ADD BOOK
export const addBook = book => (dispatch, getState) => {
  axios
    .post(URL.concat("/api/books/"), book, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addBook: "Book Added" }));
      dispatch({
        type: ADD_BOOK,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err.response.data);
    });
};

// DELETE BOOKS
export const deleteBook = id => (dispatch, getState) => {
  axios
    .delete(
      `http://35.184.199.163:8000/api/books/${id}/`,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch(createMessage({ deleteBook: "Book Deleted" }));
      dispatch({
        type: DELETE_BOOK,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// GET BOOK ISSUED
export const getBooksIssued = () => (dispatch, getState) => {
  axios
    .get(URL.concat("/api/booksissued/"), tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_BOOKISSUED,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// ADD BOOK ISSUED
export const addBookIssued = bookIssued => (dispatch, getState) => {
  axios
    .post(URL.concat("/api/booksissued/"), bookIssued, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ bookIssued: "Book Issued" }));
      dispatch({
        type: ADD_BOOKISSUED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err.response.data);
    });
};

// DELETE BOOK ISSUED
export const deleteBookIssued = id => (dispatch, getState) => {
  axios
    .delete(
      `http://35.184.199.163:8000/api/booksissued/${id}/`,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch(createMessage({ deleteBookIssued: "Deleted Book Issued" }));
      dispatch({
        type: DELETE_BOOKISSUED,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// GET BOOK INSTANCE
export const getBookInstance = () => (dispatch, getState) => {
  axios
    .get(URL.concat("/api/bookinstance/"), tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_BOOKINSTANCE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// ADD BOOK INSTANCE
export const addBookInstance = book => (dispatch, getState) => {
  axios
    .post(URL.concat("/api/bookinstance/"), book, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addBookInstance: "Book Added" }));
      dispatch({
        type: ADD_BOOKINSTANCE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err.response.data);
    });
};

// DELETE BOOK INSTANCE
export const deleteBookInstance = id => (dispatch, getState) => {
  axios
    .delete(
      `http://35.184.199.163:8000/api/bookinstance/${id}/`,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch(createMessage({ deleteBookInstance: "Book Deleted" }));
      dispatch({
        type: DELETE_BOOKINSTANCE,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
