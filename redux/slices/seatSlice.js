import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    allSeats: {
        status: null,
        error: null,
        data: null,
    },
    seatDetails: {
        status: null,
        error: null,
        data: null,
    }
}


const seatSlice = createSlice({
    name: "seat",
    initialState: initialState,
    reducers: {
        getAllSeatsRequest: (state, action) => {
            state.allSeats.status = 'pending'
        },
        getAllSeatsSuccess: (state, action) => {
            state.allSeats.status = 'success'
            state.allSeats.data = action.payload;
        },
        getAllSeatsFailure: (state, action) => {
            state.allSeats.status = 'failed'
            state.allSeats.error = action.payload;
        },
        getSeatDetailsRequest: (state, action) => {
            state.seatDetails.status = 'pending'
        },
        getSeatDetailsSuccess: (state, action) => {
            state.seatDetails.status = 'success'
            state.seatDetails.data = action.payload;
        },
        getSeatDetailsFailure: (state, action) => {
            state.seatDetails.status = 'failed'
            state.seatDetails.error = action.payload;
        },
        createSeatRequest: (state, action) => {
            state.seatDetails.status = 'pending'
        },
        createSeatSuccess: (state, action) => {
            state.seatDetails.status = 'success'
            state.seatDetails.data = action.payload;
        },
        createSeatFailure: (state, action) => {
            state.seatDetails.status = 'failed'
            state.seatDetails.error = action.payload;
        },
        updateSeatRequest: (state, action) => {
            state.seatDetails.status = 'pending'
        },
        updateSeatSuccess: (state, action) => {
            state.seatDetails.status = 'success'
            state.seatDetails.data = action.payload;
        },
        updateSeatFailure: (state, action) => {
            state.seatDetails.status = 'failed'
            state.seatDetails.error = action.payload;
        },
        deleteSeatRequest: (state, action) => {
            state.seatDetails.status = 'pending'
        },
        deleteSeatSuccess: (state, action) => {
            state.seatDetails.status = 'success'
            state.seatDetails.data = action.payload;
        },
        deleteSeatFailure: (state, action) => {
            state.seatDetails.status = 'failed'
            state.seatDetails.error = action.payload;
        },
        clearAllSeatsError: (state) => {
            state.allSeats.error = null;
        },
        clearSeatDetailsError: (state) => {
            state.seatDetails.error = null;
        }
    }
})

export const seatActions = seatSlice.actions;
export default seatSlice.reducer;