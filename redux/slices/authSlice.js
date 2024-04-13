import { createSlice } from '@reduxjs/toolkit';


const initialUserState = {
    authDetails: {
        status: null,
        error: null,
        data: null,
        isAuthenticated: false
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
        },
        forgotPasswordSuccess: (state, action) => {
            state.authDetails.status = 'success'
        },
        forgotPasswordFailure: (state, action) => {
            state.authDetails.status = 'failed'
        },
        clearError: (state) => {
            state.authDetails.error = null;
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;