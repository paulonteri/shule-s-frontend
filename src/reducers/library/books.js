import { GET_BOOKS, DELETE_BOOK, ADD_BOOK } from "../../actions/library/types";

const initialState = { books: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload)
      };
    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload] // books that are there plus the new one // reload state
      };
    //   case CLEAR_LEADS:
    //     return {
    //       ...state,
    //       books: []
    //     };
    default:
      return state;
  }
}
