import axios from "axios";
import { dashboardActions } from "../slices/dashboardSlice";
import { serverURL } from "../../config/config";

const route = `${serverURL}/dashboard`;

// Action to get Payment Overview
export const getPaymentOverview = (token) => async (dispatch) => {
    try {
        console.log('getPaymentOverviewRequest');
        dispatch(dashboardActions.getPaymentOverviewRequest());
        const data = await axios.get(`${route}/paymentOverview`, {
            headers: {
                "authorization": token
            }
        });

        console.log('get-payment-overview-res-data', data.data);
        dispatch(dashboardActions.getPaymentOverviewSuccess(data.data));
    } catch (error) {
        console.log("error", error);
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(dashboardActions.getPaymentOverviewFailure(errorMessage));
    }
};

// Action to get Member Overview
export const getMemberOverview = (token) => async (dispatch) => {
    try {
        console.log('getMemberOverviewRequest');
        dispatch(dashboardActions.getMemberOverviewRequest());
        const data = await axios.get(`${route}/memberOverview`, {
            headers: {
                "authorization": token
            }
        });

        console.log('get-member-overview-res-data', data.data);
        dispatch(dashboardActions.getMemberOverviewSuccess(data.data));
    } catch (error) {
        console.log("error", error);
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(dashboardActions.getMemberOverviewFailure(errorMessage));
    }
};

// Action to get Seat Overview
export const getSeatOverview = (token) => async (dispatch) => {
    try {
        console.log('getSeatOverviewRequest');
        dispatch(dashboardActions.getSeatOverviewRequest());
        const data = await axios.get(`${route}/seatOverview`, {
            headers: {
                "authorization": token
            }
        });

        console.log('get-seat-overview-res-data', data.data);
        dispatch(dashboardActions.getSeatOverviewSuccess(data.data));
    } catch (error) {
        console.log("error", error);
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(dashboardActions.getSeatOverviewFailure(errorMessage));
    }
};

// Action to get Locker Overview
export const getLockerOverview = (token) => async (dispatch) => {
    try {
        console.log('getLockerOverviewRequest');
        dispatch(dashboardActions.getLockerOverviewRequest());
        const data = await axios.get(`${route}/lockerOverview`, {
            headers: {
                "authorization": token
            }
        });

        console.log('get-locker-overview-res-data', data.data);
        dispatch(dashboardActions.getLockerOverviewSuccess(data.data));
    } catch (error) {
        console.log("error", error);
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(dashboardActions.getLockerOverviewFailure(errorMessage));
    }
};
