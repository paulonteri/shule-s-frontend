import { GET_BOOKS } from "../../actions/library/types";

const initialState = { books: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload
      };
    // case DELETE_LEAD:
    //   return {
    //     ...state,
    //     books: state.books.filter(lead => lead.id !== action.payload)
    //   };
    // case ADD_LEAD:
    //   return {
    //     ...state,
    //     books: [...state.books, action.payload]
    //   };
    default:
      return state;
  }
}
//
