import {
    GET_ASSIGNMENTS_FAILED,
    GET_ASSIGNMENTS_LOADING,
    GET_ASSIGNMENTS_SUCCESS,
    ADD_ASSIGNMENT_FAILED,
    ADD_ASSIGNMENT_LOADING,
    ADD_ASSIGNMENT_SUCCESS,
    DELETE_ASSIGNMENT_FAILED,
    DELETE_ASSIGNMENT_LOADING,
    DELETE_ASSIGNMENT_SUCCESS,
    PATCH_ASSIGNMENT_FAILED,
    PATCH_ASSIGNMENT_LOADING,
    PATCH_ASSIGNMENT_SUCCESS,
} from "../../actions/assignments/types";
import { findAndReplace, deleteObject } from "../common/algorithms";

const initialState = {
    assignments: [],
    assignmentsLoading: false,
    assignmentsFailed: false,
    patchingAssignments: false,
    patchingAssignmentsFailed: false,
    patchedAssignments: false,
    deletingAssignments: false,
    deletingAssignmentsFailed: false,
    deletedAssignments: false,
    uploadingAssignments: false,
    uploadingAssignmentsFailed: false,
    uploadedAssignments: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ASSIGNMENTS_SUCCESS:
            return {
                ...state,
                assignments: action.payload,
                assignmentsLoading: false,
                assignmentsFailed: false,
            };
        case GET_ASSIGNMENTS_FAILED:
            return {
                ...state,
                assignmentsLoading: false,
                assignmentsFailed: true,
            };
        case GET_ASSIGNMENTS_LOADING:
            return {
                ...state,
                assignmentsLoading: true,
                assignmentsFailed: false,
            };
        //
        case ADD_ASSIGNMENT_LOADING:
            return {
                ...state,
                uploadingAssignments: true,
                uploadedAssignments: false,
                uploadingAssignmentsFailed: false,
            };
        case ADD_ASSIGNMENT_SUCCESS:
            return {
                ...state,
                assignments: [...state.assignments, action.payload],
                uploadingAssignments: false,
                uploadingAssignmentsFailed: false,
                uploadedAssignments: true,
            };
        case ADD_ASSIGNMENT_FAILED:
            return {
                ...state,
                uploadingAssignmentsFailed: true,
                uploadingAssignments: false,
                uploadedAssignments: false,
            };
        //
        case DELETE_ASSIGNMENT_LOADING:
            return {
                ...state,
                deletingAssignments: true,
                deletedAssignments: false,
                deletingAssignmentsFailed: false,
            };
        case DELETE_ASSIGNMENT_SUCCESS:
            return {
                ...state,
                assignments: deleteObject(state.assignments, action.payload),
                deletingAssignments: false,
                deletingAssignmentsFailed: false,
                deletedAssignments: true,
            };
        case DELETE_ASSIGNMENT_FAILED:
            return {
                ...state,
                deletingAssignmentsFailed: true,
                deletingAssignments: false,
                deletedAssignments: false,
            };
        //
        //
        case PATCH_ASSIGNMENT_LOADING:
            return {
                ...state,
                patchingAssignments: true,
                patchedAssignments: false,
                patchingAssignmentsFailed: false,
            };
        case PATCH_ASSIGNMENT_SUCCESS:
            return {
                ...state,
                assignments: findAndReplace(state.assignments, action.payload),
                patchingAssignments: false,
                patchingAssignmentsFailed: false,
                patchedAssignments: true,
            };
        case PATCH_ASSIGNMENT_FAILED:
            return {
                ...state,
                patchingAssignmentsFailed: true,
                patchingAssignments: false,
                patchedAssignments: false,
            };
        //

        default:
            return state;
    }
}
