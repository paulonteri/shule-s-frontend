import {
    GET_ASSIGNMENTS_FAILED,
    GET_ASSIGNMENTS_LOADING,
    GET_ASSIGNMENTS_SUCCESS,
    ADD_ASSIGNMENT_FAILED,
    ADD_ASSIGNMENT_LOADING,
    ADD_ASSIGNMENT_SUCCESS
} from "../../actions/assignments/types";

const initialState = {
    assignments: [],
    assignmentsLoading: false,
    assignmentsFailed: false,
    uploadingAssignments: false,
    uploadingAssignmentsFailed: false,
    uploadedAssignments: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ASSIGNMENTS_SUCCESS:
            return {
                ...state,
                assignments: action.payload,
                assignmentsLoading: false,
                assignmentsFailed: false
            };
        case GET_ASSIGNMENTS_FAILED:
            return {
                ...state,
                assignmentsLoading: false,
                assignmentsFailed: true
            };
        case GET_ASSIGNMENTS_LOADING:
            return {
                ...state,
                assignmentsLoading: true,
                assignmentsFailed: false
            };
        //
        case ADD_ASSIGNMENT_LOADING:
            return {
                ...state,
                uploadingAssignments: true,
                uploadedAssignments: false,
                uploadingAssignmentsFailed: false
            };
        case ADD_ASSIGNMENT_SUCCESS:
            return {
                ...state,
                uploadingAssignments: false,
                uploadingAssignmentsFailed: false,
                uploadedAssignments: true
            };
        case ADD_ASSIGNMENT_FAILED:
            return {
                ...state,
                uploadingAssignmentsFailed: true,
                uploadingAssignments: false,
                uploadedAssignments: false
            };
        //

        default:
            return state;
    }
}
