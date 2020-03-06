import {
  GET_SUBJECTS,
  ADD_SUBJECT,
  DELETE_SUBJECT
} from "../../actions/subjects/types";

const initialState = { subjects: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SUBJECTS:
      return {
        ...state,
        subjects: action.payload
      };
    case ADD_SUBJECT:
      return {
        ...state,
        subjects: [...state.subjects, action.payload]
      };
    case DELETE_SUBJECT:
      return {
        ...state,
        subjects: state.subjects.filter(str => str.name !== action.payload)
      };

    default:
      return state;
  }
}
