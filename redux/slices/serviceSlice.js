import { createSlice } from '@reduxjs/toolkit';
import { deAllocateServices } from '../actions/serviceActions';


const initialState = {
    memberServices: {
        status: null,
        error: null,
        data: null,
    },
    createService: {
        status: null,
        error: null,
        data: null,
    },
    updateService: {
        status: null,
        error: null,
        data: null,
    },
    deAllocateService: {
        status: null,
        error: null,
        data: null,
    }
}


const serviceSlice = createSlice({
    name: "service",
    initialState: initialState,
    reducers: {
        updateMemberServicesState : (state, action)=>{
               if(action.payload.service){
               state.memberServices.data = state.memberServices?.data?.map((service)=>{
                   if(service._id == action.payload._id){
                    return action.payload
                   }
                   return service
               })
               state.memberServices.status = "success"
            }
        },

        getMemberServicesRequest: (state) => {
            state.memberServices.status = 'pending';
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
        },

        updateServiceRequest: (state) => {
            state.updateService.status = 'pending';
        },
        updateServiceSuccess: (state, action) => {
            state.updateService.status = 'success'
            state.updateService.data = action.payload;
        },
        updateServiceFailure: (state, action) => {
            state.updateService.status = 'failed'
            state.updateService.error = action.payload;
        },
        clearUpdateServiceStatus: (state, action) => {
            state.updateService.status = null
        },
        clearUpdateServiceError: (state, action) => {
            state.updateService.error = null
        },
        clearUpdateServiceData: (state, action) => {
            state.updateService.data = null
        },
        deAllocateServiceRequest: (state) => {
            state.deAllocateService.status = 'pending';
        },
        deAllocateServiceSuccess: (state, action) => {
            state.deAllocateService.status = 'success'
            state.deAllocateService.data = action.payload;
        },
        deAllocateServiceFailure: (state, action) => {
            state.deAllocateService.status = 'failed'
            state.deAllocateService.error = action.payload;
        },
        clearDeAllocateServiceStatus: (state, action) => {
            state.deAllocateService.status = null
        },
        clearDeAllocateServiceError: (state, action) => {
            state.deAllocateService.error = null
        },
        clearDeAllocateServiceData: (state, action) => {
            state.deAllocateService.data = null
        }


    }
})

export const serviceActions = serviceSlice.actions;
export default serviceSlice.reducer;