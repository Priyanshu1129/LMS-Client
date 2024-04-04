import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    updateProfileDetails: {
        status: null,
        error: null,
        data: null,
    }
}



const updateProfileSlice = createSlice({
    name: "updateProfile",
    initialState: initialState,
    reducers: {
        updateProfileRequest: (state, action) => {
            state.updateProfileDetails.status = 'pending'
        },
        updateProfileSuccess: (state, action) => {
            state.updateProfileDetails.status = 'success'
            state.updateProfileDetails.data = action.payload;
        },
        updateProfileFailure: (state, action) => {
            state.updateProfileDetails.status = 'failed'
            state.updateProfileDetails.error = action.payload;
        },
        clearError: (state) => {
            state.authDetails.error = null;
        }
    }
})

export const updateProfileActions = updateProfileSlice.actions;
export default updateProfileSlice.reducer;