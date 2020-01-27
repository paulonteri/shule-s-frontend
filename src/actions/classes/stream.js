import axios from "axios";

import { GET_STREAMS, ADD_STREAM, DELETE_STREAM } from "./types";
import { createMessage, returnErrors } from "../messages";

// GET STREAMS ACTION
export const getStreams = () => dispatch => {
  axios
    .get("api/stream/")
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
export const addStream = stream => dispatch => {
  axios
    .post("/api/stream/", stream)
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
export const deleteStream = name => dispatch => {
  axios
    .delete(`/api/stream/${name}`)
    .then(res => {
      dispatch(createMessage({ deleteStream: "Stream Deleted" }));
      dispatch({
        type: DELETE_STREAM,
        payload: name
      });
    })
    .catch(err => console.log(err));
};
