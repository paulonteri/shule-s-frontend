import {
    GET_EXAMS_SUCCESS,
    GET_EXAMS_LOADING,
    GET_EXAMS_FAILED,
    GET_EXAMRESULTS_ALL_SUCCESS,
    GET_EXAMRESULTS_ALL_LOADING,
    GET_EXAMRESULTS_ALL_FAILED,
    GET_EXAMRESULTS_PERSTUDENT_SUCCESS,
    GET_EXAMRESULTS_PERSTUDENT_LOADING,
    GET_EXAMRESULTS_PERSTUDENT_FAILED,
    ADD_EXAMRESULTS_PER_CLASS_LOADING,
    ADD_EXAMRESULTS_PER_CLASS_SUCCESS,
    ADD_EXAMRESULTS_PER_CLASS_FAILED,
    ADD_EXAMRESULTS_PER_STUDENT_LOADING,
    ADD_EXAMRESULTS_PER_STUDENT_SUCCESS,
    ADD_EXAMRESULTS_PER_STUDENT_FAILED,
    GET_EXAMRESULTS_PERCLASS_PERSUBJECT_SUCCESS,
    GET_EXAMRESULTS_PERCLASS_PERSUBJECT_LOADING,
    GET_EXAMRESULTS_PERCLASS_PERSUBJECT_FAILED,
} from "../../actions/examinations/types";

const initialState = {
    exams: [],
    examsLoading: false,
    examsFailed: false,
    examResultsPerClassPerSubject: [],
    examResultsPerClassPerSubjectLoading: false,
    examResultsPerClassPerSubjectFailed: false,
    examResultsPerStudent: [],
    examResultsPerStudentLoading: false,
    examResultsPerStudentFailed: false,
    examResultsAll: [],
    examResultsAllLoading: false,
    examResultsAllFailed: false,
    uploadingExamResultsPerClass: false,
    uploadingExamResultsPerClassFailed: false,
    uploadedExamResultsPerClass: false,
    uploadingExamResultsPerStudent: false,
    uploadingExamResultsPerStudentFailed: false,
    uploadedExamResultsPerStudent: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EXAMS_SUCCESS:
            return {
                ...state,
                exams: action.payload,
                examsLoading: false,
                examsFailed: false,
            };
        case GET_EXAMS_FAILED:
            return {
                ...state,
                examsLoading: false,
                examsFailed: true,
            };
        case GET_EXAMS_LOADING:
            return {
                ...state,
                examsLoading: true,
                examsFailed: false,
            };
        //
        case GET_EXAMRESULTS_ALL_SUCCESS:
            return {
                ...state,
                examResultsAll: action.payload,
                examResultsAllLoading: false,
                examResultsAllFailed: false,
            };
        case GET_EXAMRESULTS_ALL_FAILED:
            return {
                ...state,
                examResultsAllLoading: false,
                examResultsAllFailed: true,
            };
        case GET_EXAMRESULTS_ALL_LOADING:
            return {
                ...state,
                examResultsAllLoading: true,
                examResultsAllFailed: false,
            };
        //
        case ADD_EXAMRESULTS_PER_STUDENT_LOADING:
            return {
                ...state,
                uploadingExamResultsPerStudent: true,
                uploadedExamResultsPerStudent: false,
                uploadingExamResultsPerStudentFailed: false,
            };
        case ADD_EXAMRESULTS_PER_STUDENT_SUCCESS:
            return {
                ...state,
                uploadingExamResultsPerStudent: false,
                uploadingExamResultsPerStudentFailed: false,
                uploadedExamResultsPerStudent: true,
            };
        case ADD_EXAMRESULTS_PER_STUDENT_FAILED:
            return {
                ...state,
                uploadingExamResultsPerStudentFailed: true,
                uploadingExamResultsPerStudent: false,
                uploadedExamResultsPerStudent: false,
            };
        //
        case ADD_EXAMRESULTS_PER_CLASS_LOADING:
            return {
                ...state,
                uploadingExamResultsPerClass: true,
                uploadedExamResultsPerClass: false,
                uploadingExamResultsPerClassFailed: false,
            };
        case ADD_EXAMRESULTS_PER_CLASS_SUCCESS:
            return {
                ...state,
                uploadingExamResultsPerClass: false,
                uploadingExamResultsPerClassFailed: false,
                uploadedExamResultsPerClass: true,
            };
        case ADD_EXAMRESULTS_PER_CLASS_FAILED:
            return {
                ...state,
                uploadingExamResultsPerClassFailed: true,
                uploadingExamResultsPerClass: false,
                uploadedExamResultsPerClass: false,
            };
        //
        case GET_EXAMRESULTS_PERSTUDENT_SUCCESS:
            return {
                ...state,
                examResultsPerStudent: action.payload,
                examResultsPerStudentLoading: false,
                examResultsPerStudentFailed: false,
            };
        case GET_EXAMRESULTS_PERSTUDENT_FAILED:
            return {
                ...state,
                examResultsPerStudent: [],
                examResultsPerStudentLoading: false,
                examResultsPerStudentFailed: true,
            };
        case GET_EXAMRESULTS_PERSTUDENT_LOADING:
            return {
                ...state,
                examResultsPerStudentLoading: true,
                examResultsPerStudentFailed: false,
            };
        //
        case GET_EXAMRESULTS_PERCLASS_PERSUBJECT_SUCCESS:
            return {
                ...state,
                examResultsPerClassPerSubject: action.payload,
                examResultsPerClassPerSubjectLoading: false,
                examResultsPerClassPerSubjectFailed: false,
            };
        case GET_EXAMRESULTS_PERCLASS_PERSUBJECT_FAILED:
            return {
                ...state,
                examResultsPerClassPerSubject: [],
                examResultsPerClassPerSubjectLoading: false,
                examResultsPerClassPerSubjectFailed: true,
            };
        case GET_EXAMRESULTS_PERCLASS_PERSUBJECT_LOADING:
            return {
                ...state,
                examResultsPerClassPerSubjectLoading: true,
                examResultsPerClassPerSubjectFailed: false,
            };
        default:
            return state;
    }
}
