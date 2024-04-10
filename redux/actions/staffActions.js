import axios from "axios";
import { staffActions } from "../slices/staffSlice";
import { serverURL } from "../../config/config";

const route = `${serverURL}`

export const getAllStaff = (token) => async (dispatch) => {
    try {
        dispatch(staffActions.getAllStaffRequest());
        console.log('getAllStaffToken', token);
        const data = await axios.get(`${route}/`, {
            headers: {
                "authorization": token
            }
        });

        console.log('get-all-staff-res-data', data.data);
        dispatch(staffActions.getAllStaffSuccess(data.data));
    } catch (error) {
        console.log("error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(staffActions.getAllStaffFailure(errorMessage));
    }
};

export const getStaff = (staffId) => async (dispatch) => {
    try {
        console.log("get-staffData", staffId);
        dispatch(staffActions.getStaffRequest());

        const data = await axios.get(`${route}/staff/${staffId}`);
        console.log('get-staff-res-data', data);
        dispatch(staffActions.getStaffSuccess(data.data));
    } catch (error) {
        console.log("error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(staffActions.getStaffFailure(errorMessage));
    }
};

export const createStaff = (staffData, token) => async (dispatch) => {
    try {
        console.log("create-staffData", staffData);
        dispatch(staffActions.createStaffRequest());
        const data = await axios.post(
            `${route}/auth/create_staff`,
            staffData,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('create-staff-res-data', data);
        dispatch(staffActions.createStaffSuccess(data.data));
    } catch (error) {
        console.log("error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(staffActions.createStaffFailure(errorMessage));
    }
};

export const updateStaff = (staffData) => async (dispatch) => {
    try {
        console.log("update-staffData", staffData);
        dispatch(staffActions.updateStaffRequest());

        const data = await axios.put(
            `${route}/staff`,
            staffData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log('update-staff-res-data', data);
        dispatch(staffActions.updateStaffSuccess(data.data));
    } catch (error) {
        console.log("error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(staffActions.updateStaffFailure(errorMessage));
    }
};

export const deleteStaff = (staffId, token) => async (dispatch) => {
    try {
        console.log("delete-staffData", staffId);
        dispatch(staffActions.deleteStaffRequest());

        const data = await axios.delete(
            `${route}/${staffId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('delete-staff-res-data', data.data);
        dispatch(staffActions.deleteStaffSuccess(data.data));
    } catch (error) {
        console.log("delete-staff-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(staffActions.deleteStaffFailure(errorMessage));
    }
};

