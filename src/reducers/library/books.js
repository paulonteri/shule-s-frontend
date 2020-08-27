import {
    GET_BOOKS,
    DELETE_BOOK,
    ADD_BOOK,
    GET_BOOKISSUED,
    DELETE_BOOKISSUED,
    ADD_BOOKISSUED,
    GET_BOOKINSTANCE,
    ADD_BOOKINSTANCE,
    DELETE_BOOKINSTANCE,
} from "../../actions/library/types";

const initialState = { books: [], bookInstances: [], booksIssued: [] };

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BOOKS:
            return {
                ...state,
                books: action.payload,
            };
        case DELETE_BOOK:
            return {
                ...state,
                books: state.books.filter((book) => book.id !== action.payload),
            };
        case ADD_BOOK:
            return {
                ...state,
                books: [...state.books, action.payload],
            };
        // BOOK ISSUED
        case GET_BOOKISSUED:
            return {
                ...state,
                booksIssued: action.payload,
            };
        case DELETE_BOOKISSUED:
            return {
                ...state,
                booksIssued: state.booksIssued.filter(
                    (book) => book.id !== action.payload
                ),
            };
        case ADD_BOOKISSUED:
            return {
                ...state,
                booksIssued: [...state.booksIssued, action.payload],
            };
        // BOOK INSTANCE
        case GET_BOOKINSTANCE:
            return {
                ...state,
                bookInstances: action.payload,
            };
        case DELETE_BOOKINSTANCE:
            return {
                ...state,
                bookInstances: state.bookInstances.filter(
                    (book) => book.id !== action.payload
                ),
            };
        case ADD_BOOKINSTANCE:
            return {
                ...state,
                bookInstances: [...state.bookInstances, action.payload],
            };
        default:
            return state;
    }
}
