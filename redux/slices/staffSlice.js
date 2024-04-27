import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    allStaffs: {
        status: null,
        error: null,
        data: null,
    },
    staffDetails: {
        status: null,
        error: null,
        data: null,
    },
    deleteStaff: {
        status: null,
        error: null,
        data: null,
    },
    updateStaff: {
        status: null,
        error: null,
        data: null,
    }
}



const staffSlice = createSlice({
    name: "staff",
    initialState: initialState,
    reducers: {
        getAllStaffRequest: (state, action) => {
            state.allStaffs.status = 'pending'
        },
        getAllStaffSuccess: (state, action) => {
            state.allStaffs.status = 'success'
            state.allStaffs.data = action.payload;
        },
        getAllStaffFailure: (state, action) => {
            state.allStaffs.status = 'failed'
            state.allStaffs.error = action.payload;
        },
        getStaffRequest: (state, action) => {
            state.staffDetails.status = 'pending'
        },
        getStaffSuccess: (state, action) => {
            state.staffDetails.status = 'success'
            state.staffDetails.data = action.payload;
        },
        getStaffFailure: (state, action) => {
            state.staffDetails.status = 'failed'
            state.staffDetails.error = action.payload;
        },
        createStaffRequest: (state, action) => {
            state.staffDetails.status = 'pending'
        },
        createStaffSuccess: (state, action) => {
            state.staffDetails.status = 'success'
            state.staffDetails.data = action.payload;
        },
        createStaffFailure: (state, action) => {
            state.staffDetails.status = 'failed'
            state.staffDetails.error = action.payload;
        },
        updateStaffRequest: (state, action) => {
            state.updateStaff.status = 'pending'
        },
        updateStaffSuccess: (state, action) => {
            state.updateStaff.status = 'success'
            state.updateStaff.data = action.payload;
        },
        updateStaffFailure: (state, action) => {
            state.updateStaff.status = 'failed'
            state.updateStaff.error = action.payload;
        },
        deleteStaffRequest: (state, action) => {
            state.deleteStaff.status = 'pending'
        },
        deleteStaffSuccess: (state, action) => {
            state.deleteStaff.status = 'success'
            state.deleteStaff.data = action.payload;
        },
        deleteStaffFailure: (state, action) => {
            state.deleteStaff.status = 'failed'
            state.deleteStaff.error = action.payload;
        },
        clearAllStaffsStatus: (state) => {
            state.allStaffs.status = null;
        },
        clearStaffDetailsStatus: (state) => {
            state.staffDetails.status = null;
        },
        clearDeleteStaffStatus: (state) => {
            state.deleteStaff.status = null;
        },
        clearAllStaffsError: (state) => {
            state.allStaffs.error = null;
        },
        clearStaffDetailsError: (state) => {
            state.staffDetails.error = null;
        },
        clearDeleteStaffError: (state) => {
            state.deleteStaff.error = null;
        },
        clearUpdateStaffError: (state) => {
            state.updateStaff.error = null;
        },
        clearUpdateStaffStatus: (state) => {
            state.updateStaff.status = null;
        }
    }
})

export const staffActions = staffSlice.actions;
export default staffSlice.reducer;