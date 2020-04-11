import {
    GET_ALL_ASSIGNMENT_FILES_FAILED,
    GET_ALL_ASSIGNMENT_FILES_LOADING,
    GET_ALL_ASSIGNMENT_FILES_SUCCESS,
    GET_ASSIGNMENT_FILE_FAILED,
    GET_ASSIGNMENT_FILE_LOADING,
    GET_ASSIGNMENT_FILE_SUCCESS,
    ADD_ASSIGNMENT_FILE_FAILED,
    ADD_ASSIGNMENT_FILE_LOADING,
    ADD_ASSIGNMENT_FILE_SUCCESS
} from "../../actions/assignments/types";

const initialState = {
    assignmentFiles: [],
    assignmentFilesLoading: false,
    assignmentFilesFailed: false,
    assignmentFile: [],
    assignmentFileLoading: false,
    assignmentFileFailed: false,
    uploadingAssignmentFiles: false,
    uploadingAssignmentFilesFailed: false,
    uploadedAssignmentFiles: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ASSIGNMENT_FILE_SUCCESS:
            return {
                ...state,
                assignmentFile: action.payload,
                assignmentFileLoading: false,
                assignmentFileFailed: false
            };
        case GET_ASSIGNMENT_FILE_FAILED:
            return {
                ...state,
                assignmentFileLoading: false,
                assignmentFileFailed: true
            };
        case GET_ASSIGNMENT_FILE_LOADING:
            return {
                ...state,
                assignmentFileLoading: true,
                assignmentFileFailed: false
            };
        //
        case GET_ALL_ASSIGNMENT_FILES_SUCCESS:
            return {
                ...state,
                assignmentFiles: action.payload,
                assignmentFilesLoading: false,
                assignmentFilesFailed: false
            };
        case GET_ALL_ASSIGNMENT_FILES_FAILED:
            return {
                ...state,
                assignmentFilesLoading: false,
                assignmentFilesFailed: true
            };
        case GET_ALL_ASSIGNMENT_FILES_LOADING:
            return {
                ...state,
                assignmentFilesLoading: true,
                assignmentFilesFailed: false
            };
        //
        case ADD_ASSIGNMENT_FILE_LOADING:
            return {
                ...state,
                uploadingAssignmentFiles: true,
                uploadedAssignmentFiles: false,
                uploadingAssignmentFilesFailed: false
            };
        case ADD_ASSIGNMENT_FILE_SUCCESS:
            return {
                ...state,
                uploadingAssignmentFiles: false,
                uploadingAssignmentFilesFailed: false,
                uploadedAssignmentFiles: true
            };
        case ADD_ASSIGNMENT_FILE_FAILED:
            return {
                ...state,
                uploadingAssignmentFilesFailed: true,
                uploadingAssignmentFiles: false,
                uploadedAssignmentFiles: false
            };
        //

        default:
            return state;
    }
}
