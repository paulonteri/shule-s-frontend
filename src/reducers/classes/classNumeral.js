import {
    GET_CLASS_NUMERALS_SUCCESS,
    ADD_CLASS_NUMERAL_SUCCESS,
    DELETE_CLASS_NUMERAL_SUCCESS
} from "../../actions/classes/types";

const initialState = { classNumerals: [] };

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_CLASS_NUMERALS_SUCCESS:
            return {
                ...state,
                classNumerals: action.payload
            };
        case ADD_CLASS_NUMERAL_SUCCESS:
            return {
                ...state,
                classNumerals: [...state.classNumerals, action.payload] // classNumerals that are there plus the new one // reload state
            };
        case DELETE_CLASS_NUMERAL_SUCCESS:
            return {
                ...state,
                classNumerals: state.classNumerals.filter(
                    classN => classN.name !== action.payload
                )
            };

        default:
            return state;
    }
}
