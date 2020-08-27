import axios from "axios";
import { URL } from "../url";
import { short_cached_api } from "../cache";

import {
    ADD_STREAM_FAILED,
    ADD_STREAM_LOADING,
    ADD_STREAM_SUCCESS,
    DELETE_STREAM_FAILED,
    DELETE_STREAM_LOADING,
    DELETE_STREAM_SUCCESS,
    GET_STREAMS_FAILED,
    GET_STREAMS_LOADING,
    GET_STREAMS_SUCCESS,
} from "./types";
import { createMessage, returnErrors } from "../messages";
import { tokenConfig } from "../auth/auth";

// GET STREAM_SUCCESSS_SUCCESS ACTION
export const getStreams = () => (dispatch, getState) => {
    dispatch({ type: GET_STREAMS_LOADING });
    short_cached_api
        .get(URL.concat("/api/v2.0/academics/stream/"), tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_STREAMS_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: GET_STREAMS_FAILED });
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

// ADD STREAM_SUCCESS ACTION
export const addStream = (stream) => (dispatch, getState) => {
    dispatch({ type: ADD_STREAM_LOADING });
    axios
        .post(
            URL.concat("/api/v2.0/academics/stream/"),
            stream,
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch(createMessage({ addStream: "Stream Added" }));
            dispatch({
                type: ADD_STREAM_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: ADD_STREAM_FAILED });
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

// DELETE STREAM_SUCCESS ACTION
export const deleteStream = (name) => (dispatch, getState) => {
    dispatch({ type: DELETE_STREAM_LOADING });
    axios
        .delete(
            URL.concat(`/api/v2.0/academics/stream/${name}`),
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch(createMessage({ deleteStream: "Stream Deleted" }));
            dispatch({
                type: DELETE_STREAM_SUCCESS,
                payload: name,
            });
        })
        .catch((err) => {
            dispatch({ type: DELETE_STREAM_FAILED });
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};
