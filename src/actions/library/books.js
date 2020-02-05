import axios from "axios";

import { GET_BOOKS, DELETE_BOOK, ADD_BOOK } from "./types";
import { createMessage, returnErrors } from "../messages";
import { tokenConfig } from "../auth/auth";

// GET BOOKS action method
export const getBooks = () => (dispatch, getState) => {
  axios
    .get("api/library/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_BOOKS, // in the types file
        payload: res.data // response data from the server (books)
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE BOOKS
export const deleteBook = id => (dispatch, getState) => {
  axios
    .delete(`api/library/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteBook: "Book Deleted" }));
      dispatch({
        type: DELETE_BOOK,
        payload: id
      });
    })
   .catch(
      err => dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// ADD BOOK
export const addBook = book => (dispatch, getState) => {
  axios
    .post("/api/library/", book, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addBook: "Book Added" })); 
      dispatch({
        type: ADD_BOOK,
        payload: res.data
      });
    })
    .catch(
      err => {dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err.response.data);
    });
};

// // DELETE BOOK action method // (id)
// export const deleteLead = id => dispatch => {
//   axios
//     .delete(`/api/books/${id}/`)
//     .then(res => {
//       dispatch(createMessage({ deleteLead: "Lead Deleted" }));
//       dispatch({
//         type: DELETE_LEAD,
//         payload: id
//       });
//     })
//     .catch(err => console.log(err));
// };

// // ADD BOOK
//     .catch(err =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };
