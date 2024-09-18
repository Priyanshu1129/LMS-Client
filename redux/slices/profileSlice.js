import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    profileDetails: {
        status: null,
        error: null,
        data: null,
    }
}


const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        updateProfileRequest: (state, action) => {
            state.profileDetails.status = 'pending'
        },
        updateProfileSuccess: (state, action) => {
            state.profileDetails.status = 'success'
            state.profileDetails.data = action.payload;
        },
        updateProfileFailure: (state, action) => {
            state.profileDetails.status = 'failed'
            state.profileDetails.error = action.payload;
        },
        clearProfileStatus: (state) => {
            state.profileDetails.error = null;
        },
        clearProfileError: (state) => {
            state.profileDetails.error = null;
        }
    }
})

export const profileActions = profileSlice.actions;
export default profileSlice.reducer;