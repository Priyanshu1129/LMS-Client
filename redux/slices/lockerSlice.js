import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    allLockers: {
        status: null,
        error: null,
        data: null,
    },
    lockerDetails: {
        status: null,
        error: null,
        data: null,
    },
    deleteLocker: {
        status: null,
        error: null,
        data: null
    },
}


const lockerSlice = createSlice({
    name: "locker",
    initialState: initialState,
    reducers: {
        getAllLockersRequest: (state, action) => {
            state.allLockers.status = 'pending'
        },
        getAllLockersSuccess: (state, action) => {
            state.allLockers.status = 'success'
            state.allLockers.data = action.payload;
        },
        getAllLockersFailure: (state, action) => {
            state.allLockers.status = 'failed'
            state.allLockers.error = action.payload;
        },
        getLockerDetailsRequest: (state, action) => {
            state.lockerDetails.status = 'pending'
        },
        getLockerDetailsSuccess: (state, action) => {
            state.lockerDetails.status = 'success'
            state.lockerDetails.data = action.payload;
        },
        getLockerDetailsFailure: (state, action) => {
            state.lockerDetails.status = 'failed'
            state.lockerDetails.error = action.payload;
        },
        createLockerRequest: (state, action) => {
            state.lockerDetails.status = 'pending'
        },
        createLockerSuccess: (state, action) => {
            state.lockerDetails.status = 'success'
            state.lockerDetails.data = action.payload;
        },
        createLockerFailure: (state, action) => {
            state.lockerDetails.status = 'failed'
            state.lockerDetails.error = action.payload;
        },
        updateLockerRequest: (state, action) => {
            state.lockerDetails.status = 'pending'
        },
        updateLockerSuccess: (state, action) => {
            state.lockerDetails.status = 'success'
            state.lockerDetails.data = action.payload;
        },
        updateLockerFailure: (state, action) => {
            state.lockerDetails.status = 'failed'
            state.lockerDetails.error = action.payload;
        },
        deleteLockerRequest: (state, action) => {
            state.deleteLocker.status = 'pending'
        },
        deleteLockerSuccess: (state, action) => {
            state.deleteLocker.status = 'success'
            state.deleteLocker.data = action.payload;
        },
        deleteLockerFailure: (state, action) => {
            state.deleteLocker.status = 'failed'
            state.deleteLocker.error = action.payload;
        },
        allocateLockerRequest: (state, action) => {
            state.lockerDetails.status = 'pending'
        },
        allocateLockerSuccess: (state, action) => {
            state.lockerDetails.status = 'success'
            state.lockerDetails.data = action.payload;
        },
        allocateLockerFailed: (state, action) => {
            state.lockerDetails.status = 'failed'
            state.lockerDetails.error = action.payload;
        },
        deallocateLockerRequest: (state, action) => {
            state.lockerDetails.status = 'pending'
        },
        deallocateLockerSuccess: (state, action) => {
            state.lockerDetails.status = 'success'
            state.lockerDetails.data = action.payload;
        },
        deallocateLockerFailed: (state, action) => {
            state.lockerDetails.status = 'failed'
            state.lockerDetails.error = action.payload;
        },
        clearLockerDetailsStatus: (state, action) => {
            state.lockerDetails.status = null;
        },
        clearDeleteLockerStatus: (state, action) => {
            state.deleteLocker.status = null;
        },
        clearAllLockersStatus: (state, action) => {
            state.allLockers.status = null;
        },
        clearDeleteLockerError: (state) => {
            state.deleteLocker.error = null;
        },
        clearAllLockersError: (state) => {
            state.allLockers.error = null;
        },
        clearLockerDetailsError: (state) => {
            state.lockerDetails.error = null;
        }
    }
})

export const lockerActions = lockerSlice.actions;
export default lockerSlice.reducer;