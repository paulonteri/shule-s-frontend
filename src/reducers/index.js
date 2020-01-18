import { combineReducers } from "redux";
import books from "./library/books";

export default combineReducers({
  booksReducer: books
});
