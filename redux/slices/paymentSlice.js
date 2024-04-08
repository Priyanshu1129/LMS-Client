import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    allPayments: {
        status: null,
        error: null,
        data: null,
    },
    paymentDetails: {
        status: null,
        error: null,
        data: null,
    }
}


const paymentSlice = createSlice({
    name: "payment",
    initialState: initialState,
    reducers: {
        getAllPaymentRequest: (state, action) => {
            state.allPayments.status = 'pending'
        },
        getAllPaymentSuccess: (state, action) => {
            state.allPayments.status = 'success'
            state.allPayments.data = action.payload;
        },
        getAllPaymentFailure: (state, action) => {
            state.allPayments.status = 'failed'
            state.allPayments.error = action.payload;
        },
        getPaymentRequest: (state, action) => {
            state.paymentDetails.status = 'pending'
        },
        getPaymentSuccess: (state, action) => {
            state.paymentDetails.status = 'success'
            state.paymentDetails.data = action.payload;
        },
        getPaymentFailure: (state, action) => {
            state.paymentDetails.status = 'failed'
            state.paymentDetails.error = action.payload;
        },
        createPaymentRequest: (state, action) => {
            state.paymentDetails.status = 'pending'
        },
        createPaymentSuccess: (state, action) => {
            state.paymentDetails.status = 'success'
            state.paymentDetails.data = action.payload;
        },
        createPaymentFailure: (state, action) => {
            state.paymentDetails.status = 'failed'
            state.paymentDetails.error = action.payload;
        },
        updatePaymentRequest: (state, action) => {
            state.paymentDetails.status = 'pending'
        },
        updatePaymentSuccess: (state, action) => {
            state.paymentDetails.status = 'success'
            state.paymentDetails.data = action.payload;
        },
        updatePaymentFailure: (state, action) => {
            state.paymentDetails.status = 'failed'
            state.paymentDetails.error = action.payload;
        },
        deletePaymentRequest: (state, action) => {
            state.paymentDetails.status = 'pending'
        },
        deletePaymentSuccess: (state, action) => {
            state.paymentDetails.status = 'success'
            state.paymentDetails.data = action.payload;
        },
        deletePaymentFailure: (state, action) => {
            state.paymentDetails.status = 'failed'
            state.paymentDetails.error = action.payload;
        },
        clearPaymentDetailsStatus: (state, action ) => {
            state.paymentDetails.status = null;
        },
        clearAllPaymentsStatus: (state, action ) => {
            state.allPayments.status = null;
        },
        clearAllPaymentsError: (state) => {
            state.allPayments.error = null;
        },
        clearPaymentDetailsError: (state) => {
            state.paymentDetails.error = null;
        }
    }
})

export const paymentActions = paymentSlice.actions;
export default paymentSlice.reducer;