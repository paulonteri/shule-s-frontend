import axios from "axios";

import { GET_STREAMS, ADD_STREAM, DELETE_STREAM } from "./types";
import { createMessage, returnErrors } from "../messages";
import { tokenConfig } from "../auth/auth";

// GET STREAMS ACTION
export const getStreams = () => (dispatch, getState) => {
  axios
    .get("http://0.0.0.0:8000/api/stream/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_STREAMS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// ADD STREAM ACTION
export const addStream = stream => (dispatch, getState) => {
  axios
    .post("http://0.0.0.0:8000/api/stream/", stream, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addStream: "Stream Added" }));
      dispatch({
        type: ADD_STREAM,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE STREAM ACTION
export const deleteStream = name => (dispatch, getState) => {
  axios
    .delete(`http://0.0.0.0:8000/api/stream/${name}`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteStream: "Stream Deleted" }));
      dispatch({
        type: DELETE_STREAM,
        payload: name
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
