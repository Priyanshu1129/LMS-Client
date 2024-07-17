import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    paymentOverview: {
        status: null,
        error: null,
        data: null,
    },
    memberOverview: {
        status: null,
        error: null,
        data: null,
    },
    seatOverview: {
        status: null,
        error: null,
        data: null,
    },
    lockerOverview: {
        status: null,
        error: null,
        data: null,
    },
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: initialState,
    reducers: {
        // Payment Overview Reducers
        getPaymentOverviewRequest: (state) => {
            state.paymentOverview.status = 'pending';
        },
        getPaymentOverviewSuccess: (state, action) => {
            state.paymentOverview.status = 'success';
            state.paymentOverview.data = action.payload;
        },
        getPaymentOverviewFailure: (state, action) => {
            state.paymentOverview.status = 'failed';
            state.paymentOverview.error = action.payload;
        },
        clearPaymentOverviewStatus: (state) => {
            state.paymentOverview.status = null;
        },
        clearPaymentOverviewError: (state) => {
            state.paymentOverview.error = null;
        },
        clearPaymentOverviewData: (state) => {
            state.paymentOverview.data = null;
        },

        // Member Overview Reducers
        getMemberOverviewRequest: (state) => {
            state.memberOverview.status = 'pending';
        },
        getMemberOverviewSuccess: (state, action) => {
            state.memberOverview.status = 'success';
            state.memberOverview.data = action.payload;
        },
        getMemberOverviewFailure: (state, action) => {
            state.memberOverview.status = 'failed';
            state.memberOverview.error = action.payload;
        },
        clearMemberOverviewStatus: (state) => {
            state.memberOverview.status = null;
        },
        clearMemberOverviewError: (state) => {
            state.memberOverview.error = null;
        },
        clearMemberOverviewData: (state) => {
            state.memberOverview.data = null;
        },

        // Seat Overview Reducers
        getSeatOverviewRequest: (state) => {
            state.seatOverview.status = 'pending';
        },
        getSeatOverviewSuccess: (state, action) => {
            state.seatOverview.status = 'success';
            state.seatOverview.data = action.payload;
        },
        getSeatOverviewFailure: (state, action) => {
            state.seatOverview.status = 'failed';
            state.seatOverview.error = action.payload;
        },
        clearSeatOverviewStatus: (state) => {
            state.seatOverview.status = null;
        },
        clearSeatOverviewError: (state) => {
            state.seatOverview.error = null;
        },
        clearSeatOverviewData: (state) => {
            state.seatOverview.data = null;
        },

        // Locker Overview Reducers
        getLockerOverviewRequest: (state) => {
            state.lockerOverview.status = 'pending';
        },
        getLockerOverviewSuccess: (state, action) => {
            state.lockerOverview.status = 'success';
            state.lockerOverview.data = action.payload;
        },
        getLockerOverviewFailure: (state, action) => {
            state.lockerOverview.status = 'failed';
            state.lockerOverview.error = action.payload;
        },
        clearLockerOverviewStatus: (state) => {
            state.lockerOverview.status = null;
        },
        clearLockerOverviewError: (state) => {
            state.lockerOverview.error = null;
        },
        clearLockerOverviewData: (state) => {
            state.lockerOverview.data = null;
        },
    },
});

export const dashboardActions = dashboardSlice.actions;
export default dashboardSlice.reducer;
