import {
    ADD_PERMISSION,
    GET_PERMISSIONS,
    DELETE_PERMISSION,
    ADD_PERMISSIONGROUP,
    GET_PERMISSIONGROUPS,
    DELETE_PERMISSIONGROUP,
} from "../../actions/auth/types";

const initialState = {
    permissions: [],
    permissiongroups: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        // PERMISSIONS
        case GET_PERMISSIONS:
            return {
                ...state,
                permissions: action.payload,
            };
        case ADD_PERMISSION:
            return {
                ...state,
                permissions: [...state.permissions, action.payload],
            };
        case DELETE_PERMISSION:
            return {
                ...state,
                permissions: state.permissions.filter(
                    (perm) => perm.id !== action.payload
                ),
            };
        // PERMISSION GROUPS
        case GET_PERMISSIONGROUPS:
            return {
                ...state,
                permissiongroups: action.payload,
            };
        case ADD_PERMISSIONGROUP:
            return {
                ...state,
                permissiongroups: [...state.permissiongroups, action.payload],
            };
        case DELETE_PERMISSIONGROUP:
            return {
                ...state,
                permissiongroups: state.permissiongroups.filter(
                    (permg) => permg.id !== action.payload
                ),
            };
        default:
            return state;
    }
}
