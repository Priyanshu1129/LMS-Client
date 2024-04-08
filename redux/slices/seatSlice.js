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
    },
    deleteSeat: {
        status: null,
        error: null,
        data: null
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
            state.deleteSeat.status = 'pending'
        },
        deleteSeatSuccess: (state, action) => {
            state.deleteSeat.status = 'success'
            state.deleteSeat.data = action.payload;
        },
        deleteSeatFailure: (state, action) => {
            state.deleteSeat.status = 'failed'
            state.deleteSeat.error = action.payload;
        },
        allocateSeatRequest: (state, action) => {
            state.seatDetails.status = 'pending'
        },
        allocateSeatSuccess: (state, action) => {
            state.seatDetails.status = 'success'
            state.seatDetails.data = action.payload;
        },
        allocateSeatFailed: (state, action) => {
            state.seatDetails.status = 'failed'
            state.seatDetails.error = action.payload;
        },
        deallocateSeatRequest: (state, action) => {
            state.seatDetails.status = 'pending'
        },
        deallocateSeatSuccess: (state, action) => {
            state.seatDetails.status = 'success'
            state.seatDetails.data = action.payload;
        },
        deallocateSeatFailed: (state, action) => {
            state.seatDetails.status = 'failed'
            state.seatDetails.error = action.payload;
        },
        clearSeatDetailsStatus: (state, action) => {
            state.seatDetails.status = null;
        },
        clearDeleteSeatStatus: (state, action) => {
            state.deleteSeat.status = null;
        },
        clearAllSeatsStatus: (state, action) => {
            state.allSeats.status = null;
        },
        clearDeleteSEatError: (state) => {
            state.deleteSeat.error = null;
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