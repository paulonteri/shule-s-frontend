import {
    GET_SUBJECTS_SUCCESS,
    GET_SUBJECTS_FAILED,
    GET_SUBJECTS_LOADING,
    ADD_SUBJECT,
    DELETE_SUBJECT,
} from "../../actions/subjects/types";

const initialState = {
    subjects: [],
    getSubjectsLoading: false,
    getSubjectsFailed: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SUBJECTS_SUCCESS:
            return {
                ...state,
                subjects: action.payload,
                getSubjectsLoading: false,
                getSubjectsFailed: false,
            };
        case GET_SUBJECTS_LOADING:
            return {
                ...state,
                getSubjectsLoading: true,
                getSubjectsFailed: false,
            };
        case GET_SUBJECTS_FAILED:
            return {
                ...state,

                getSubjectsLoading: false,
                getSubjectsFailed: true,
            };
        case ADD_SUBJECT:
            return {
                ...state,
                subjects: [...state.subjects, action.payload],
            };
        case DELETE_SUBJECT:
            return {
                ...state,
                subjects: state.subjects.filter(
                    (str) => str.name !== action.payload
                ),
            };

        default:
            return state;
    }
}
