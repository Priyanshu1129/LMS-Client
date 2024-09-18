import { createSlice } from '@reduxjs/toolkit';


const initialUserState = {
    authDetails: {
        status: null,
        error: null,
        data: null,
        isAuthenticated: false
    },
    verifyOTPDetails: {
        status: null,
        error: null,
        data: null,
    }
}


const authSlice = createSlice({
    name: "auth",
    initialState: initialUserState,
    reducers: {
        loginRequest: (state, action) => {
            state.authDetails.status = 'pending'
        },
        loginSuccess: (state, action) => {
            state.authDetails.status = 'success'
            state.authDetails.isAuthenticated = true;
            state.authDetails.data = action.payload;
        },
        loginFailure: (state, action) => {
            state.authDetails.status = 'failed'
            state.authDetails.isAuthenticated = false;
            state.authDetails.error = action.payload;
        },
        logoutRequest: (state, action) => {
            state.authDetails.status = "pending";
            state.authDetails.isAuthenticated = false;
        },
        logoutSuccess: (state, action) => {
            state.authDetails.status = 'success'
            state.authDetails.isAuthenticated = false;
            state.authDetails.data = null
        },
        logoutFailure: (state, action) => {
            state.authDetails.status = 'failed';
        },
        registerRequest: (state, action) => {
            state.authDetails.status = 'pending'
        },
        registerSuccess: (state, action) => {
            state.authDetails.status = 'success'
            state.authDetails.isAuthenticated = true;
            state.authDetails.data = action.payload;
        },
        registerFailure: (state, action) => {
            state.authDetails.status = 'failed'
            state.authDetails.isAuthenticated = false;
            state.authDetails.data = null
            state.authDetails.error = action.payload;
        },
        forgotPasswordRequest: (state, action) => {
            state.authDetails.status = 'pending'
            state.authDetails.isAuthenticated = false
        },
        forgotPasswordSuccess: (state, action) => {
            state.authDetails.status = 'success'
            state.authDetails.data = action.payload
            state.authDetails.isAuthenticated = false
        },
        forgotPasswordFailure: (state, action) => {
            state.authDetails.status = 'failed'
            state.authDetails.error = action.payload
            state.authDetails.isAuthenticated = false
        },
        verifyOTPRequest: (state) => {
            state.verifyOTPDetails.status = 'pending'
        },
        verifyOTPSuccess: (state, action) => {
            state.verifyOTPDetails.status = 'success'
            state.verifyOTPDetails.data = action.payload
        },
        verifyOTPFailure: (state, action) => {
            state.verifyOTPDetails.status = 'failed'
            state.verifyOTPDetails.error = action.payload
        },
        clearError: (state) => {
            state.authDetails.error = null;
        },
        clearStatus: (state) => {
            state.authDetails.status = null;
        },
        clearVerifyOTPDetailsStatus: (state) => {
            state.verifyOTPDetails.status = null;
        },
        clearVerifyOTPDetailsError: (state) => {
            state.verifyOTPDetails.error = null;
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;