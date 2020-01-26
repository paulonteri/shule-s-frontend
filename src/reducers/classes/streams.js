import { GET_STREAMS } from "../../actions/classes/types";

const initialState = { streams: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STREAMS:
      return {
        ...state,
        students: action.payload
      };
    default:
      return state;
  }
}
