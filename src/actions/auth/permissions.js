import axios from "axios";
import { URL } from "../url";
import {
    ADD_PERMISSION,
    GET_PERMISSIONS,
    DELETE_PERMISSION,
    ADD_PERMISSIONGROUP,
    GET_PERMISSIONGROUPS,
    DELETE_PERMISSIONGROUP,
} from "./types";

import { createMessage, returnErrors } from "../messages";
import { tokenConfig } from "../auth/auth";

// GET PERMISSIONS
export const getPermissions = () => (dispatch, getState) => {
    axios
        .get(URL.concat("/api/v2.0/auth/permissions/"), tokenConfig(getState))
        .then((res) => {
            console.log("get Permissions");
            dispatch({
                type: GET_PERMISSIONS,
                payload: res.data,
            });
        })
        .catch((err) =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// ADD PERMISSION
export const addPermission = (Permission) => (dispatch, getState) => {
    axios
        .post(
            URL.concat("/api/v2.0/auth/permissions/"),
            Permission,
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch(createMessage({ addPermission: "Permission Added" }));
            dispatch({
                type: ADD_PERMISSION,
                payload: res.data,
            });
        })
        .catch((err) =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// DELETE PERMISSION
export const deletePermission = (id) => (dispatch, getState) => {
    axios
        .delete(
            URL.concat(`/api/v2.0/auth/permissions/${id}`),
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch(
                createMessage({ deletePermission: "Permission Deleted!" })
            );
            dispatch({
                type: DELETE_PERMISSION,
                payload: id,
            });
        })
        .catch((err) =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// GET PERMISSION GROUPS
export const getPermissionGroups = () => (dispatch, getState) => {
    axios
        .get(
            URL.concat("/api/v2.0/auth/permissiongroups/"),
            tokenConfig(getState)
        )
        .then((res) => {
            console.log("get PermissionGroups");
            dispatch({
                type: GET_PERMISSIONGROUPS,
                payload: res.data,
            });
        })
        .catch((err) =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// ADD PERMISSION GROUP
export const addPermissionGroup = (PermissionGroup) => (dispatch, getState) => {
    axios
        .post(
            URL.concat("/api/v2.0/auth/permissiongroups/"),
            PermissionGroup,
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch(
                createMessage({ addPermissionGroup: "Permission Group Added" })
            );
            dispatch({
                type: ADD_PERMISSIONGROUP,
                payload: res.data,
            });
        })
        .catch((err) =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

// DELETE PERMISSION GROUP
export const deletePermissionGroup = (id) => (dispatch, getState) => {
    axios
        .delete(
            URL.concat(`/api/v2.0/auth/permissiongroups/${id}`),
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch(
                createMessage({
                    deletePermissionGroup: "Permission Group Deleted!",
                })
            );
            dispatch({
                type: DELETE_PERMISSIONGROUP,
                payload: id,
            });
        })
        .catch((err) =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};
