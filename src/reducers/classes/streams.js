import {
    GET_STREAMS_SUCCESS,
    ADD_STREAM_SUCCESS,
    DELETE_STREAM_SUCCESS
} from "../../actions/classes/types";

const initialState = { streams: [] };

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_STREAMS_SUCCESS:
            return {
                ...state,
                streams: action.payload
            };
        case ADD_STREAM_SUCCESS:
            return {
                ...state,
                streams: [...state.streams, action.payload] // streams that are there plus the new one // reload state
            };
        case DELETE_STREAM_SUCCESS:
            return {
                ...state,
                streams: state.streams.filter(
                    str => str.name !== action.payload
                )
            };

        default:
            return state;
    }
}
