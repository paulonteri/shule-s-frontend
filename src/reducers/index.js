import { combineReducers } from "redux";
import books from "./library/books";
import errors from "./errors";
import messages from "./messages";
import students from "./students/students";
import streams from "./classes/streams";

export default combineReducers({
  errorsReducer: errors,
  messagesReducer: messages,
  booksReducer: books,
  studentsReducer: students,
  streamsReducer: streams
});
