import { combineReducers } from "redux";
import books from "./library/books";
import errors from "./errors";

export default combineReducers({
  booksReducer: books,
  errorsReducer: errors
});
