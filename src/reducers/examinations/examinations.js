import {
  GET_EXAMRESULTS_ALL_SUCCESS,
  GET_EXAMRESULTS_ALL_LOADING,
  GET_EXAMRESULTS_ALL_FAILED,
  ADD_EXAMRESULTS_PER_CLASS_LOADING,
  ADD_EXAMRESULTS_PER_CLASS_SUCCESS,
  ADD_EXAMRESULTS_PER_CLASS_FAILED,
  ADD_EXAMRESULTS_PER_STUDENT_LOADING,
  ADD_EXAMRESULTS_PER_STUDENT_SUCCESS,
  ADD_EXAMRESULTS_PER_STUDENT_FAILED
} from "./types";

const initialState = {
  examResultsAll: [],
  examResultsAllLoading: false,
  examResultsAllFailed: false,
  uploadingExamResultsPerClass: false,
  uploadingExamResultsPerClassFailed: false,
  uploadedExamResultsPerClass: false,
  uploadingExamResultsPerStudent: false,
  uploadingExamResultsPerStudentFailed: false,
  uploadedExamResultsPerStudent: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EXAMRESULTS_ALL_SUCCESS:
      return {
        ...state,
        examResultsAll: action.payload,
        examResultsAllLoading: false,
        examResultsAllFailed: false
      };
    case GET_EXAMRESULTS_ALL_FAILED:
      return {
        ...state,
        examResultsAllLoading: false,
        examResultsAllFailed: true
      };
    case GET_EXAMRESULTS_ALL_LOADING:
      return {
        ...state,
        examResultsAllLoading: true,
        examResultsAllFailed: false
      };
    //
    case ADD_EXAMRESULTS_PER_STUDENT_LOADING:
      return {
        ...state,
        uploadingExamResultsPerStudent: true,
        uploadedExamResultsPerStudent: false,
        uploadingExamResultsPerStudentFailed: false
      };
    case ADD_EXAMRESULTS_PER_STUDENT_SUCCESS:
      return {
        ...state,
        uploadingExamResultsPerStudent: false,
        uploadingExamResultsPerStudentFailed: false,
        uploadedExamResultsPerStudent: true
      };
    case ADD_EXAMRESULTS_PER_STUDENT_FAILED:
      return {
        ...state,
        uploadingExamResultsPerStudentFailed: true,
        uploadingExamResultsPerStudent: false,
        uploadedExamResultsPerStudent: false
      };
    //
    case ADD_EXAMRESULTS_PER_CLASS_LOADING:
      return {
        ...state,
        uploadingExamResultsPerClass: true,
        uploadedExamResultsPerClass: false,
        uploadingExamResultsPerClassFailed: false
      };
    case ADD_EXAMRESULTS_PER_CLASS_SUCCESS:
      return {
        ...state,
        uploadingExamResultsPerClass: false,
        uploadingExamResultsPerClassFailed: false,
        uploadedExamResultsPerClass: true
      };
    case ADD_EXAMRESULTS_PER_CLASS_FAILED:
      return {
        ...state,
        uploadingExamResultsPerClassFailed: true,
        uploadingExamResultsPerClass: false,
        uploadedExamResultsPerClass: false
      };
    default:
      return state;
  }
}
