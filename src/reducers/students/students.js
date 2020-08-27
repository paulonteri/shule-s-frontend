import {
    GET_STUDENTS_SUCCESS,
    GET_STUDENTS_FAILED,
    GET_STUDENTS_LOADING,
    DELETE_STUDENT,
    ADD_STUDENT,
    INVALIDATE_STUDENT_CACHE,
    VALIDATE_STUDENT_CACHE,
} from "../../actions/students/types";

const initialState = {
    students: [],
    invalidateStudentCache: false,
    getSudentsLoading: false,
    getStudentsFailed: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_STUDENTS_SUCCESS:
            return {
                ...state,
                students: action.payload,
                getSudentsLoading: false,
                getStudentsFailed: false,
            };
        case GET_STUDENTS_LOADING:
            return {
                ...state,
                getSudentsLoading: true,
                getStudentsFailed: false,
            };
        case GET_STUDENTS_FAILED:
            return {
                ...state,
                getSudentsLoading: false,
                getStudentsFailed: true,
            };
        case ADD_STUDENT:
            return {
                ...state,
                students: [...state.students, action.payload],
            };
        case DELETE_STUDENT:
            return {
                ...state,
                students: state.students.filter(
                    (stud) => stud.student_id !== action.payload
                ),
            };
        case INVALIDATE_STUDENT_CACHE:
            return {
                ...state,
                invalidateStudentCache: true,
            };
        case VALIDATE_STUDENT_CACHE:
            return {
                ...state,
                invalidateStudentCache: false,
            };
        default:
            return state;
    }
}
