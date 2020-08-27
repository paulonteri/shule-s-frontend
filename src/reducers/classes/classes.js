import {
    GET_CLASSES_SUCCESS,
    ADD_CLASS_SUCCESS,
    ADD_CLASS_LOADING,
    ADD_CLASS_FAILED,
    PATCH_CLASS_SUCCESS,
    PATCH_CLASS_LOADING,
    PATCH_CLASS_FAILED,
    DELETE_CLASS_SUCCESS,
    DELETE_CLASS_LOADING,
    DELETE_CLASS_FAILED,
    GET_CLASSES_FAILED,
    GET_CLASSES_LOADING,
} from "../../actions/classes/types";
import { findAndReplace, deleteObject } from "../common/algorithms";

const initialState = {
    classes: [],
    getClassesLoading: false,
    getClassesFail: false,
    uploadingClasses: false,
    uploadedClasses: false,
    uploadingClassesFailed: false,
    patchingClasses: false,
    patchedClasses: false,
    patchingClassesFailed: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CLASSES_SUCCESS:
            return {
                ...state,
                classes: action.payload,
                getClassesLoading: false,
                getClassesFail: false,
            };
        case GET_CLASSES_LOADING:
            return {
                ...state,
                getClassesLoading: true,
                getClassesFail: false,
            };
        case GET_CLASSES_FAILED:
            return {
                ...state,
                getClassesLoading: false,
                getClassesFail: true,
            };

        //
        case ADD_CLASS_LOADING:
            return {
                ...state,
                uploadingClasses: true,
                uploadedClasses: false,
                uploadingClassesFailed: false,
            };
        case ADD_CLASS_SUCCESS:
            return {
                ...state,
                classes: [...state.classes, action.payload],
                uploadingClasses: false,
                uploadingClassesFailed: false,
                uploadedClasses: true,
            };
        case ADD_CLASS_FAILED:
            return {
                ...state,
                uploadingClassesFailed: true,
                uploadingClasses: false,
                uploadedClasses: false,
            };
        //
        case DELETE_CLASS_LOADING:
            return {
                ...state,
                deletingClasses: true,
                deletedClasses: false,
                deletingClassesFailed: false,
            };
        case DELETE_CLASS_SUCCESS:
            return {
                ...state,
                classes: deleteObject(state.classes, action.payload),
                deletingClasses: false,
                deletingClassesFailed: false,
                deletedClasses: true,
            };
        case DELETE_CLASS_FAILED:
            return {
                ...state,
                deletingClassesFailed: true,
                deletingClasses: false,
                deletedClasses: false,
            };
        //
        //
        case PATCH_CLASS_LOADING:
            return {
                ...state,
                patchingClasses: true,
                patchedClasses: false,
                patchingClassesFailed: false,
            };
        case PATCH_CLASS_SUCCESS:
            return {
                ...state,
                classes: findAndReplace(state.classes, action.payload),
                patchingClasses: false,
                patchingClassesFailed: false,
                patchedClasses: true,
            };
        case PATCH_CLASS_FAILED:
            return {
                ...state,
                patchingClassesFailed: true,
                patchingClasses: false,
                patchedClasses: false,
            };
        //
        default:
            return state;
    }
}
