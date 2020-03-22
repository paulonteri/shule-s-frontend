import axios from "axios";
import { URL } from "../url";

import { GET_STREAMS, ADD_STREAM, DELETE_STREAM } from "./types";
import { createMessage, returnErrors } from "../messages";
import { tokenConfig } from "../auth/auth";

// GET STREAMS ACTION
export const getStreams = () => (dispatch, getState) => {
  axios
    .get(URL.concat("/api/v2.0/academics/stream/"), tokenConfig(getState))
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
    .post(
      URL.concat("/api/v2.0/academics/stream/"),
      stream,
      tokenConfig(getState)
    )
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
    .delete(
      URL.concat(`/api/v2.0/academics/stream/${name}`),
      tokenConfig(getState)
    )
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
