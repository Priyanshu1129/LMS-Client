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
    },
    //by ash
    allPaymentsOfMember: {
        status: null,
        error: null,
        data: null,
    },
    deletePayment: {

    }
}


const paymentSlice = createSlice({
    name: "payment",
    initialState: initialState,
    reducers: {
        //by ash
        getAllPaymentsOfMemberRequest: (state, action) => {
            state.allPaymentsOfMember.status = 'pending'
        },
        getAllPaymentsOfMemberSuccess: (state, action) => {
            state.allPaymentsOfMember.status = 'success'
            state.allPaymentsOfMember.data = action.payload;
        },
        getAllPaymentsOfMemberFailure: (state, action) => {
            state.allPaymentsOfMember.status = 'failed'
            state.allPaymentsOfMember.error = action.payload;
        },
        clearAllPaymentsofMemberStatus: (state, action) => {
            state.allPaymentsOfMember.status = null
        },
        clearAllPaymentsofMemberError: (state, action) => {
            state.allPaymentsOfMember.error = null
        },
        clearAllPaymentsofMemberData: (state, action) => {
            state.allPaymentsOfMember.data = null
        },

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
        clearPaymentDetailsStatus: (state, action) => {
            state.paymentDetails.status = null;
        },
        clearAllPaymentsStatus: (state, action) => {
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