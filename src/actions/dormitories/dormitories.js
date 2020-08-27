import { short_cached_api } from "../cache";
import { URL } from "../url";

import { GET_DORMS } from "./types";

import { returnErrors } from "../messages";
import { tokenConfig } from "../auth/auth";

// GET DORMS
export const getDorms = () => (dispatch, getState) => {
    short_cached_api
        .get(URL.concat("/api/v2.0/dormitories/"), tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: GET_DORMS,
                payload: res.data,
            });
        })
        .catch((err) =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};
