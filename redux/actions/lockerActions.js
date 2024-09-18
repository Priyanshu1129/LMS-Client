import axios from "axios";
import { lockerActions } from "../slices/lockerSlice";
import { serverURL } from "../../config/config";

const route = `${serverURL}/locker`

export const getAllLockers = (token) => async (dispatch) => {
    try {
        dispatch(lockerActions.getAllLockersRequest());
        console.log('get-all-locker-token', token);
        const data = await axios.get(`${route}/`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-all-locker-res-data', data.data);
        dispatch(lockerActions.getAllLockersSuccess(data.data));
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
        dispatch(lockerActions.getAllLockersFailure(errorMessage));
    }
};

export const getLocker = (lockerId) => async (dispatch) => {
    try {
        console.log("get-paymentData", paymentId);
        dispatch(lockerActions.getLockerDetailsRequest());

        const data = await axios.get(`${route}/locker/${paymentId}`);
        console.log('get-locker-res-data', data);
        dispatch(lockerActions.getLockerDetailsSuccess(data.data));
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
        dispatch(lockerActions.getLockerDetailsFailure(errorMessage));
    }
};

export const createLocker = (lockerData, token) => async (dispatch) => {
    try {
        console.log("create-locker-data", lockerData, token);
        dispatch(lockerActions.createLockerRequest());
        let path = "";
        if (!lockerData.createSingleLocker) {
            path = "create_multiple_lockers"
        }

        const data = await axios.post(
            `${route}/${path}`,
            lockerData,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('create-locker-res-data', data.data);
        dispatch(lockerActions.createLockerSuccess(data.data));
    } catch (error) {
        console.log("create-locker-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(lockerActions.createLockerFailure(errorMessage));
    }
};

export const updateLocker = (lockerData) => async (dispatch) => {
    try {
        console.log("update-paymentData", paymentData);
        dispatch(lockerActions.updateLockerRequest());

        const data = await axios.put(
            `${route}/locker`,
            paymentData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log('update-locker-res-data', data);
        dispatch(lockerActions.updateLockerSuccess(data.data));
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
        dispatch(lockerActions.updateLockerFailure(errorMessage));
    }
};

export const deleteLocker = (lockerId, token) => async (dispatch) => {
    try {
        console.log("delete-locker-data", lockerId);
        dispatch(lockerActions.deleteLockerRequest());

        const data = await axios.delete(
            `${route}/${lockerId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('delete-locker-res-data', data.data);
        dispatch(lockerActions.deleteLockerSuccess(data.data));
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
        dispatch(lockerActions.deleteLockerFailure(errorMessage));
    }
};

export const allocateLocker = (allocateData, token) => async (dispatch) => {
    try {
        console.log("allocate-locker-Data", allocateData);
        dispatch(lockerActions.allocateLockerRequest());

        const data = await axios.post(
            `${route}/allocate`,
            allocateData,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('allocate-locker-res-data', data.data);

        dispatch(lockerActions.allocateLockerSuccess(data.data));
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
        dispatch(lockerActions.allocateLockerFailed(errorMessage));
    }
};

export const deAllocateLocker = (lockerId, token) => async (dispatch) => {
    try {
        console.log("de-allocate-locker-Data", lockerId, token);
        dispatch(lockerActions.deallocateLockerRequest());

        const data = await axios.post(
            `${route}/de_allocate/${lockerId}`, {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );

        console.log('de-allocate-locker-res-data', data.data);
        dispatch(lockerActions.deallocateLockerSuccess(data.data));
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
        dispatch(lockerActions.deallocateLockerFailed(errorMessage));
    }
};
