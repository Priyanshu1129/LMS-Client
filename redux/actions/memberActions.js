import axios from "axios";
import { memberActions } from "../slices/memberSlice";
import { serverURL } from "../../config/config";


const route = `${serverURL}/member`

export const getAllMember = (token) => async (dispatch) => {
    try {
        dispatch(memberActions.getAllMemberRequest());
        console.log('getAllMemberToken', token);
        const data = await axios.get(`${route}/`, {
            headers: {
                "authorization": token
            }
        });
        
        console.log('get-all-member-res-data', data);
        dispatch(memberActions.getAllMemberSuccess(data.data));
    } catch (error) {
        console.log("error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(memberActions.getAllMemberFailure(errorMessage));
    }
};

export const getMember = (memberId) => async (dispatch) => {
    try {
        console.log("get-memberData", memberId);
        dispatch(memberActions.getMemberRequest());

        const data = await axios.get(`${route}/member/${memberId}`);
        console.log('get-member-res-data', data);
        dispatch(memberActions.getMemberSuccess(data.data));
    } catch (error) {
        console.log("error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(memberActions.getMemberFailure(errorMessage));
    }
};

export const createMember = (memberData, token) => async (dispatch) => {
    try {
        console.log("create-memberData", memberData);
        dispatch(memberActions.createMemberRequest());
        const data = await axios.post(
            `${route}/`,
            memberData,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('create-member-res-data', data);
        dispatch(memberActions.createMemberSuccess(data.data));
    } catch (error) {
        console.log("error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(memberActions.createMemberFailure(errorMessage));
    }
};

export const updateMember = (memberData) => async (dispatch) => {
    try {
        console.log("update-memberData", memberData);
        dispatch(memberActions.updateMemberRequest());

        const data = await axios.put(
            `${route}/member`,
            memberData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log('update-member-res-data', data);
        dispatch(memberActions.updateMemberSuccess(data.data));
    } catch (error) {
        console.log("error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(memberActions.updateMemberFailure(errorMessage));
    }
};

export const deleteMember = (memberData) => async (dispatch) => {
    try {
        console.log("delete-memberData", memberData);
        dispatch(memberActions.deleteMemberRequest());

        const data = await axios.delete(
            `${route}/member`,
            memberData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log('delete-member-res-data', data);
        dispatch(memberActions.deleteMemberSuccess(data.data));
    } catch (error) {
        console.log("error", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(memberActions.deleteMemberFailure(errorMessage));
    }
};