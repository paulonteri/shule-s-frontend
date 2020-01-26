import axios from "axios";

import { GET_STREAMS } from "./types";
import { createMessage, returnErrors } from "../messages";

// GET STREAMS ACTION
export const getStreams = () => dispatch => {
  axios
    .get("api/stream")
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
