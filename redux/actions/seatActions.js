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
        // console.log('get-all-seat-res-data', data);
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

export const getSeat = (paymentId) => async (dispatch) => {
    try {
        console.log("get-paymentData", paymentId);
        dispatch(seatActions.getSeatDetailsRequest());

        const data = await axios.get(`${route}/seat/${paymentId}`);
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

export const createSeat = (paymentData) => async (dispatch) => {
    try {
        console.log("create-paymentData", paymentData);
        dispatch(seatActions.createSeatRequest());

        const data = await axios.post(
            `${route}/seat`,
            paymentData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log('create-seat-res-data', data);
        dispatch(seatActions.createSeatSuccess(data.data));
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
        dispatch(seatActions.createSeatFailure(errorMessage));
    }
};

export const updateSeat = (paymentData) => async (dispatch) => {
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

export const deleteSeat = (paymentData) => async (dispatch) => {
    try {
        console.log("delete-paymentData", paymentData);
        dispatch(seatActions.deleteSeatRequest());

        const data = await axios.delete(
            `${route}/seat`,
            paymentData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log('delete-seat-res-data', data);
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