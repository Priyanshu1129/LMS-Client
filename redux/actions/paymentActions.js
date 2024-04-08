import axios from "axios";
import { paymentActions } from "../slices/paymentSlice";
import { serverURL } from "../../config/config";

const route = `${serverURL}/payment`

export const getAllPayment = (token) => async (dispatch) => {
    try {
        dispatch(paymentActions.getAllPaymentRequest());

        const data = await axios.get(`${route}/`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-all-payment-res-data', data.data);
        dispatch(paymentActions.getAllPaymentSuccess(data.data));
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
        dispatch(paymentActions.getAllPaymentFailure(errorMessage));
    }
};

export const getPayment = (paymentId) => async (dispatch) => {
    try {
        console.log("get-paymentData", paymentId);
        dispatch(paymentActions.getPaymentRequest());

        const data = await axios.get(`${route}/payment/${paymentId}`);
        console.log('get-payment-res-data', data);
        dispatch(paymentActions.getPaymentSuccess(data.data));
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
        dispatch(paymentActions.getPaymentFailure(errorMessage));
    }
};

export const createPayment = (paymentData, token) => async (dispatch) => {
    try {
        console.log("create-paymentData", paymentData);
        dispatch(paymentActions.createPaymentRequest());

        const data = await axios.post(
            `${route}/`,
            paymentData,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('create-payment-res-data', data.data);
        dispatch(paymentActions.createPaymentSuccess(data.data));
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
        dispatch(paymentActions.createPaymentFailure(errorMessage));
    }
};

export const updatePayment = (paymentData) => async (dispatch) => {
    try {
        console.log("update-paymentData", paymentData);
        dispatch(paymentActions.updatePaymentRequest());

        const data = await axios.put(
            `${route}/payment`,
            paymentData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log('update-payment-res-data', data);
        dispatch(paymentActions.updatePaymentSuccess(data.data));
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
        dispatch(paymentActions.updatePaymentFailure(errorMessage));
    }
};

export const deletePayment = (paymentData) => async (dispatch) => {
    try {
        console.log("delete-paymentData", paymentData);
        dispatch(paymentActions.deletePaymentRequest());

        const data = await axios.delete(
            `${route}/payment`,
            paymentData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log('delete-payment-res-data', data);
        dispatch(paymentActions.deletePaymentSuccess(data.data));
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
        dispatch(paymentActions.deletePaymentFailure(errorMessage));
    }
};