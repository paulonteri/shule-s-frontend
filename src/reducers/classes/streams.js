import {
    GET_STREAMS_SUCCESS,
    ADD_STREAM_SUCCESS,
    DELETE_STREAM_SUCCESS,
    DELETE_STREAM_LOADING,
    ADD_STREAM_LOADING,
    GET_STREAMS_FAIL,
    GET_STREAMS_LOADING,
    ADD_STREAM_FAIL,
    DELETE_STREAM_FAIL
} from "../../actions/classes/types";

const initialState = {
    streams: [],
    getStreamsLoading: false,
    getStreamsFail: false,
    addStreamLoading: false,
    addStreamFail: false,
    deleteStreamLoading: false,
    deleteStreamFail: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_STREAMS_SUCCESS:
            return {
                ...state,
                streams: action.payload,
                getStreamsLoading: false,
                getStreamsFail: false
            };
        case GET_STREAMS_LOADING:
            return {
                ...state,
                getStreamsLoading: true,
                getStreamsFail: false
            };
        case GET_STREAMS_FAIL:
            return {
                ...state,
                getStreamsLoading: false,
                getStreamsFail: true
            };
        case ADD_STREAM_SUCCESS:
            return {
                ...state,
                streams: [...state.streams, action.payload],
                addStreamLoading: false,
                addStreamFail: false
            };
        case ADD_STREAM_LOADING:
            return {
                ...state,
                addStreamLoading: true,
                addStreamFail: false
            };
        case ADD_STREAM_FAIL:
            return {
                ...state,
                addStreamLoading: false,
                addStreamFail: true
            };
        case DELETE_STREAM_SUCCESS:
            return {
                ...state,
                streams: state.streams.filter(
                    str => str.name !== action.payload
                ),
                deleteStreamLoading: false,
                deleteStreamFail: false
            };
        case DELETE_STREAM_LOADING:
            return {
                ...state,
                deleteStreamLoading: true,
                deleteStreamFail: false
            };
        case DELETE_STREAM_FAIL:
            return {
                ...state,
                deleteStreamLoading: false,
                deleteStreamFail: true
            };

        default:
            return state;
    }
}
