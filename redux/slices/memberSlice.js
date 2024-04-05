import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    allMembers: {
        status: null,
        error: null,
        data: null,
    },
    memberDetails: {
        status: null,
        error: null,
        data: null,
    }
}



const memberSlice = createSlice({
    name: "member",
    initialState: initialState,
    reducers: {
        getAllMemberRequest: (state, action) => {
            state.allMembers.status = 'pending'
        },
        getAllMemberSuccess: (state, action) => {
            state.allMembers.status = 'success'
            state.allMembers.data = action.payload;
        },
        getAllMemberFailure: (state, action) => {
            state.allMembers.status = 'failed'
            state.allMembers.error = action.payload;
        },
        getMemberRequest: (state, action) => {
            state.memberDetails.status = 'pending'
        },
        getMemberSuccess: (state, action) => {
            state.memberDetails.status = 'success'
            state.memberDetails.data = action.payload;
        },
        getMemberFailure: (state, action) => {
            state.memberDetails.status = 'failed'
            state.memberDetails.error = action.payload;
        },
        createMemberRequest: (state, action) => {
            state.memberDetails.status = 'pending'
        },
        createMemberSuccess: (state, action) => {
            state.memberDetails.status = 'success'
            state.memberDetails.data = action.payload;
        },
        createMemberFailure: (state, action) => {
            state.memberDetails.status = 'failed'
            state.memberDetails.error = action.payload;
        },
        updateMemberRequest: (state, action) => {
            state.memberDetails.status = 'pending'
        },
        updateMemberSuccess: (state, action) => {
            state.memberDetails.status = 'success'
            state.memberDetails.data = action.payload;
        },
        updateMemberFailure: (state, action) => {
            state.memberDetails.status = 'failed'
            state.memberDetails.error = action.payload;
        },
        deleteMemberRequest: (state, action) => {
            state.memberDetails.status = 'pending'
        },
        deleteMemberSuccess: (state, action) => {
            state.memberDetails.status = 'success'
            state.memberDetails.data = action.payload;
        },
        deleteMemberFailure: (state, action) => {
            state.memberDetails.status = 'failed'
            state.memberDetails.error = action.payload;
        },
        clearAllMembersError: (state) => {
            state.allMembers.error = null;
            state.allMembers.status = null;
        },
        clearMemberDetailsError: (state) => {
            state.memberDetails.error = null;
            state.memberDetails.pending = null;

        }
    }
})

export const memberActions = memberSlice.actions;
export default memberSlice.reducer;