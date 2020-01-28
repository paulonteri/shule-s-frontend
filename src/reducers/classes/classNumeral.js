import {
  GET_CLASSNUMERALS,
  ADD_CLASSNUMERAL,
  DELETE_CLASSNUMERAL
} from "../../actions/classes/types";

const initialState = { classNumerals: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLASSNUMERALS:
      return {
        ...state,
        classNumerals: action.payload
      };
    case ADD_CLASSNUMERAL:
      return {
        ...state,
        classNumerals: [...state.classNumerals, action.payload] // classNumerals that are there plus the new one // reload state
      };
    case DELETE_CLASSNUMERAL:
      return {
        ...state,
        classNumerals: state.classNumerals.filter(
          classN => classN.name !== action.payload
        )
      };

    default:
      return state;
  }
}
