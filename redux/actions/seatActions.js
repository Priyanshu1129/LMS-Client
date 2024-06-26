import axios from "axios";
import { seatActions } from "../slices/seatSlice";
import { serverURL } from "../../config/config";

const route = `${serverURL}/seat`

export const getAllSeats = (token) => async (dispatch) => {
    try {
        dispatch(seatActions.getAllSeatsRequest());
        console.log('get-all-seat-token', token);
        const data = await axios.get(`${route}/`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-all-seat-res-data', data.data);
        dispatch(seatActions.getAllSeatsSuccess(data.data));
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
        dispatch(seatActions.getAllSeatsFailure(errorMessage));
    }
};

export const getSeat = (seatId) => async (dispatch) => {
    try {
        console.log("get-paymentData", seatId);
        dispatch(seatActions.getSeatDetailsRequest());

        const data = await axios.get(`${route}/seat/${seatId}`);
        console.log('get-seat-res-data', data);
        dispatch(seatActions.getSeatDetailsSuccess(data.data));
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
        dispatch(seatActions.getSeatDetailsFailure(errorMessage));
    }
};

export const createSeat = (seatData, token) => async (dispatch) => {
    try {
        console.log("create-seat-data", seatData, token);
        dispatch(seatActions.createSeatRequest());
        let path = "";
        if (!seatData.createSingleSeat) {
            path = "create_multiple_seats"
        }

        const data = await axios.post(
            `${route}/${path}`,
            seatData,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('create-seat-res-data', data.data);
        dispatch(seatActions.createSeatSuccess(data.data));
    } catch (error) {
        console.log("create-seat-error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(seatActions.createSeatFailure(errorMessage));
    }
};

export const updateSeat = (seatData) => async (dispatch) => {
    try {
        console.log("update-paymentData", paymentData);
        dispatch(seatActions.updateSeatRequest());

        const data = await axios.put(
            `${route}/seat`,
            paymentData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log('update-seat-res-data', data);
        dispatch(seatActions.updateSeatSuccess(data.data));
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
        dispatch(seatActions.updateSeatFailure(errorMessage));
    }
};

export const deleteSeat = (seatId, token) => async (dispatch) => {
    try {
        console.log("delete-seat-data", seatId);
        dispatch(seatActions.deleteSeatRequest());

        const data = await axios.delete(
            `${route}/${seatId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('delete-seat-res-data', data.data);
        dispatch(seatActions.deleteSeatSuccess(data.data));
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
        dispatch(seatActions.deleteSeatFailure(errorMessage));
    }
};

export const allocateSeat = (allocateData, token) => async (dispatch) => {
    try {
        console.log("allocate-seat-Data", allocateData);
        dispatch(seatActions.allocateSeatRequest());

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
        console.log('allocate-seat-res-data', data.data);

        dispatch(seatActions.allocateSeatSuccess(data.data));
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
        dispatch(seatActions.allocateSeatFailed(errorMessage));
    }
};

export const deAllocateSeat = (memberId, token) => async (dispatch) => {
    try {
        console.log("de-allocate-seat-Data", memberId, token);
        dispatch(seatActions.deallocateSeatRequest());

        const data = await axios.post(
            `${route}/de_allocate/${memberId}`, {},
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );

        console.log('de-allocate-seat-res-data', data.data);
        dispatch(seatActions.deallocateSeatSuccess(data.data));
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
        dispatch(seatActions.deallocateSeatFailed(errorMessage));
    }
};
