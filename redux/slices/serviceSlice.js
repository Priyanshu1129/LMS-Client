import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    memberServices: {
        status: null,
        error: null,
        data: null,
    }
}


const serviceSlice = createSlice({
    name: "service",
    initialState: initialState,
    reducers: {
        getMemberServicesRequest: (state, action) => {
            state.memberServices.status = 'pending'
        },
        getMemberServicesSuccess: (state, action) => {
            state.memberServices.status = 'success'
            state.memberServices.data = action.payload;
        },
        getMemberServicesFailure: (state, action) => {
            state.memberServices.status = 'failed'
            state.memberServices.error = action.payload;
        },
        clearMemberServicesStatus: (state, action) => {
            state.memberServices.status = null
        },
        clearMemberServicesError: (state, action) => {
            state.memberServices.error = null
        },
        clearMemberServicesData: (state, action) => {
            state.memberServices.data = null
        }
    }
})

export const serviceActions = serviceSlice.actions;
export default serviceSlice.reducer;