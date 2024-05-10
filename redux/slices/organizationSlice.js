import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    organizationDetails: {
        status: null,
        error: null,
        data: null,
    }
}


const organizationSlice = createSlice({
    name: "organization",
    initialState: initialState,
    reducers: {
        organizationDetailsRequest: (state) => {
            state.organizationDetails.status = 'pending'
        },
        organizationDetailsSuccess: (state, action) => {
            state.organizationDetails.status = 'success'
            state.organizationDetails.data = action.payload;
        },
        organizationDetailsFailure: (state, action) => {
            state.organizationDetails.status = 'failed'
            state.organizationDetails.error = action.payload;
        },
        updateOrganizationDetailsRequest: (state) => {
            state.organizationDetails.status = 'pending'
        },
        updateOrganizationDetailsSuccess: (state, action) => {
            state.organizationDetails.status = 'success'
            state.organizationDetails.data = action.payload;
        },
        updateOrganizationDetailsFailure: (state, action) => {
            state.organizationDetails.status = 'failed'
            state.organizationDetails.error = action.payload;
        },
        clearOrganizationDetailsStatus: (state) => {
            state.organizationDetails.status = null;
        },
        clearOrganizationDetailsError: (state) => {
            state.organizationDetails.error = null;
        }
    }
})

export const organizationActions = organizationSlice.actions;
export default organizationSlice.reducer;
