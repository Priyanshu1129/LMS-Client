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
    },
    deleteMember: {
        status: null,
        error: null,
        data: null,
    },
    createMember: {
        status: null,
        error: null,
        data: null,
    },
    updateMember: {
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
            state.createMember.status = 'pending'
        },
        createMemberSuccess: (state, action) => {
            state.createMember.status = 'success'
            state.createMember.data = action.payload;
        },
        createMemberFailure: (state, action) => {
            state.createMember.status = 'failed'
            state.createMember.error = action.payload;
        },
        updateMemberRequest: (state, action) => {
            state.updateMember.status = 'pending'
        },
        updateMemberSuccess: (state, action) => {
            state.updateMember.status = 'success'
            state.updateMember.data = action.payload;
        },
        updateMemberFailure: (state, action) => {
            state.updateMember.status = 'failed'
            state.updateMember.error = action.payload;
        },
        deleteMemberRequest: (state, action) => {
            state.deleteMember.status = 'pending'
        },
        deleteMemberSuccess: (state, action) => {
            state.deleteMember.status = 'success'
            state.deleteMember.data = action.payload;
        },
        deleteMemberFailure: (state, action) => {
            state.deleteMember.status = 'failed'
            state.deleteMember.error = action.payload;
        },
        clearAllMembersStatus: (state) => {
            state.allMembers.status = null;
        },
        clearMemberDetailsStatus: (state) => {
            state.memberDetails.status = null;
        },
        clearCreateMemberStatus: (state) => {
            state.createMember.status = null;
        },
        clearUpdateMemberStatus: (state) => {
            state.updateMember.status = null;
        },
        clearDeleteMemberStatus: (state) => {
            state.deleteMember.status = null;
        },
        clearAllMembersError: (state) => {
            state.allMembers.error = null;
        },
        clearMemberDetailsError: (state) => {
            state.memberDetails.error = null;
        },
        clearCreateMemberError: (state) => {
            state.createMember.error = null;
        },
        clearUpdateMemberError: (state) => {
            state.updateMember.error = null;
        },
        clearDeleteMemberError: (state) => {
            state.deleteMember.error = null;
        },
    }
})

export const memberActions = memberSlice.actions;
export default memberSlice.reducer;