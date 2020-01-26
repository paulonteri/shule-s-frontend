import axios from "axios";

import { GET_BOOKS, DELETE_BOOK, ADD_BOOK } from "./types";
// import { GET_ERRORS } from "../types"; // replaced by the returnErrors function
import { createMessage, returnErrors } from "../messages";

// GET LEADS action method
export const getBooks = () => dispatch => {
  axios
    .get("api/library/")
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
export const deleteBook = id => dispatch => {
  axios
    .delete(`api/library/${id}/`)
    .then(res => {
      dispatch(createMessage({ deleteBook: "Book Deleted" }));
      dispatch({
        type: DELETE_BOOK,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

// ADD BOOK
export const addBook = book => dispatch => {
  axios
    .post("/api/library/", book)
    .then(res => {
      dispatch(createMessage({ addBook: "Book Added" })); 
      dispatch({
        type: ADD_BOOK,
        payload: res.data
      });
    })
    .catch(
      err => dispatch(returnErrors(err.response.data, err.response.status))
      // {
      //   const errors = { msg: err.response.data, status: err.response.status };
      //   dispatch({ type: GET_ERRORS, payload: errors }); // dispach the errors to state
      // }
    );
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
