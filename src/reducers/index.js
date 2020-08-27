import { combineReducers } from "redux";

import books from "./library/books";
import errors from "./common/errors";
import messages from "./common/messages";
import students from "./students/students";
import streams from "./classes/streams";
import classNumerals from "./classes/classNumeral";
import classes from "./classes/classes";
import dormitories from "./dormitories/dormitories";
import auth from "./authentication/auth";
import subjects from "./subjects/subject";
import analytics from "./library/analytics";
import examinations from "./examinations/examinations";
import assignments from "./assignments/assignments";
import studentAnalytics from "./students/analytics/studentAnalytics";

export default combineReducers({
    authReducer: auth,
    errorsReducer: errors,
    messagesReducer: messages,
    booksReducer: books,
    libraryAnalyticsReducer: analytics,
    studentsReducer: students,
    studentAnalyticsReducer: studentAnalytics,
    subjectsReducer: subjects,
    classesReducer: classes,
    streamsReducer: streams,
    classNumeralsReducer: classNumerals,
    dormitoriesReducer: dormitories,
    examinationsReducer: examinations,
    assignmentsReducer: assignments,
});
