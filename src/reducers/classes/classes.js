import {
  GET_CLASSES,
  ADD_CLASS,
  DELETE_CLASS
} from "../../actions/classes/types";

const initialState = { classes: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLASSES:
      return {
        ...state,
        classes: action.payload
      };
    default:
      return state;
  }
}
