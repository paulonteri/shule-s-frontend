import { GET_BOOKS_NUM } from "../../actions/library/types";

const initialState = { books_num: [] };

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BOOKS_NUM:
            return {
                ...state,
                books_num: action.payload,
            };
        default:
            return state;
    }
}
