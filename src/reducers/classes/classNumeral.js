import {
    GET_CLASS_NUMERALS_SUCCESS,
    ADD_CLASS_NUMERAL_SUCCESS,
    DELETE_CLASS_NUMERAL_SUCCESS,
    GET_CLASS_NUMERALS_LOADING,
    GET_CLASS_NUMERALS_FAILED,
    ADD_CLASS_NUMERAL_LOADING,
    DELETE_CLASS_NUMERAL_LOADING,
    DELETE_CLASS_NUMERAL_FAILED,
    ADD_CLASS_NUMERAL_FAILED,
} from "../../actions/classes/types";

const initialState = {
    classNumerals: [],
    getClassNumeralsLoading: false,
    getClassNumeralFail: false,
    addClassNumeralLoading: false,
    addClassNumeralFail: false,
    deleteClassNumeralLoading: false,
    deleteClassNumeralFail: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CLASS_NUMERALS_SUCCESS:
            return {
                ...state,
                classNumerals: action.payload,
                getClassNumeralsLoading: false,
                getClassNumeralFail: false,
            };
        case GET_CLASS_NUMERALS_LOADING:
            return {
                ...state,
                getClassNumeralsLoading: true,
                getClassNumeralFail: false,
            };
        case GET_CLASS_NUMERALS_FAILED:
            return {
                ...state,
                getClassNumeralsLoading: false,
                getClassNumeralFail: true,
            };
        case ADD_CLASS_NUMERAL_SUCCESS:
            return {
                ...state,
                classNumerals: [...state.classNumerals, action.payload], // classNumerals that are there plus the new one // reload state
                addClassNumeralLoading: false,
                addClassNumeralFail: false,
            };
        case ADD_CLASS_NUMERAL_LOADING:
            return {
                ...state,
                addClassNumeralLoading: true,
                addClassNumeralFail: false,
            };
        case ADD_CLASS_NUMERAL_FAILED:
            return {
                ...state,
                addClassNumeralLoading: false,
                addClassNumeralFail: true,
            };
        case DELETE_CLASS_NUMERAL_SUCCESS:
            return {
                ...state,
                classNumerals: state.classNumerals.filter(
                    (classN) => classN.name !== action.payload
                ),
                deleteClassNumeralLoading: false,
                deleteClassNumeralFail: false,
            };
        case DELETE_CLASS_NUMERAL_LOADING:
            return {
                ...state,
                deleteClassNumeralLoading: true,
                deleteClassNumeralFail: false,
            };
        case DELETE_CLASS_NUMERAL_FAILED:
            return {
                ...state,
                deleteClassNumeralLoading: false,
                deleteClassNumeralFail: true,
            };

        default:
            return state;
    }
}
