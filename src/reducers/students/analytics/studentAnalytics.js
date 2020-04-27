import {
    GET_STUDENT_ANALYTICS_SUCCESS,
    GET_STUDENT_ANALYTICS_FAILED,
    GET_STUDENT_ANALYTICS_LOADING
} from "../../actions/students/types";

const initialState = {
    studentsAnalytics: [],
    getStudentAnalyticsLoading: false,
    getStudentAnalyticsFailed: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_STUDENT_ANALYTICS_SUCCESS:
            return {
                ...state,
                studentsAnalytics: action.payload,
                getStudentAnalyticsLoading: false,
                getStudentAnalyticsFailed: false
            };
        case GET_STUDENT_ANALYTICS_LOADING:
            return {
                ...state,
                getStudentAnalyticsLoading: true,
                getStudentAnalyticsFailed: false
            };
        case GET_STUDENT_ANALYTICS_FAILED:
            return {
                ...state,
                getStudentAnalyticsLoading: false,
                getStudentAnalyticsFailed: true
            };
        default:
            return state;
    }
}
