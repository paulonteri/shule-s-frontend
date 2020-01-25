import { combineReducers } from "redux";
import books from "./library/books";
import errors from "./errors";
import messages from "./messages";
import students from "./students/students";

export default combineReducers({
  booksReducer: books,
  errorsReducer: errors,
  messagesReducer: messages,
  studentsReducer: students
});
