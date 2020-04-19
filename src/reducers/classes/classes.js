import {
    GET_CLASSES_SUCCESS,
    ADD_CLASS_SUCCESS,
    DELETE_CLASS_SUCCESS,
    GET_CLASSES_LOADING,
    GET_CLASSES_FAIL
} from "../../actions/classes/types";

const initialState = {
    classes: [],
    getClassesLoading: false,
    getClassesFail: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_CLASSES_SUCCESS:
            return {
                ...state,
                classes: action.payload,
                getClassesLoading: false,
                getClassesFail: false
            };
        case GET_CLASSES_LOADING:
            return {
                ...state,
                getClassesLoading: true,
                getClassesFail: false
            };
        case GET_CLASSES_FAIL:
            return {
                ...state,
                getClassesLoading: false,
                getClassesFail: true
            };
        default:
            return state;
    }
}
