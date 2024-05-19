import axios from "axios";
import { authActions } from "../slices/authSlice";
import { serverURL } from "../../config/config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const route = `${serverURL}/auth`

export const login = (loginData) => async (dispatch) => {
    try {
        console.log("loginData", loginData);
        dispatch(authActions.loginRequest());

        const data = await axios.post(
            `${route}/login`,
            loginData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log('login-res-data', data);
        if (data.status == 200) {
            AsyncStorage.setItem("data", JSON.stringify(data.data));
            AsyncStorage.setItem("token", `Bearer ${data.data.token}`);
            AsyncStorage.setItem("isAuthenticated", "true");
        }
        dispatch(authActions.loginSuccess(data.data));
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
        dispatch(authActions.loginFailure(errorMessage));
    }
};

export const register = (registrationData) => async (dispatch) => {
    try {
        console.log("registrationData", registrationData);
        dispatch(authActions.registerRequest());
        const { data } = await axios.post(
            `${route}/signup`,
            registrationData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log('registration-res:', data.data);
        dispatch(authActions.registerSuccess(data));
    } catch (error) {
        console.log('registration-error', error);
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(authActions.registerFailure(errorMessage));
    }
};

export const forgotPassword = (forgotPasswordData) => async (dispatch) => {
    try {
        console.log('forgotPasswordData', forgotPasswordData)
        dispatch(authActions.forgotPasswordRequest());

        const { data } = await axios.post(
            `${route}/send_reset_passwor_link`,
            forgotPasswordData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log('forgot-password-res', data);
        dispatch(authActions.forgotPasswordSuccess(data));
    } catch (error) {
        console.log("error", error.response.data.message)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(authActions.forgotPasswordFailure(errorMessage));
    }
};

export const verifyOTP = (otpData) => async (dispatch) => {
    try {
        console.log('verifyOTPData', otpData);
        dispatch(authActions.verifyOTPRequest());

        const { data } = await axios.post(
            `${route}/verify-otp`,
            otpData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log('forgot-password-res', data);
        dispatch(authActions.verifyOTPSuccess(data));
    } catch (error) {
        console.log("error", error.response.data.message)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(authActions.verifyOTPFailure(errorMessage));
    }
};