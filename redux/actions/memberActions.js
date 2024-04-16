import axios from "axios";
import { memberActions } from "../slices/memberSlice";
import { serverURL } from "../../config/config";


const route = `${serverURL}/member`

export const getAllMember = (pageNumber, token) => async (dispatch) => {
    try {
        dispatch(memberActions.getAllMemberRequest());
        console.log('getAllMemberToken', token, pageNumber);
        console.log("----------get all member route ", route)
        const data = await axios.get(`${route}/`, {
            headers: {
                "authorization": token
            }
        });
         
        console.log('get-all-member-res-data', data.data);
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

export const getMember = (memberId, token) => async (dispatch) => {
    try {
        console.log("get-member-data", memberId);
        dispatch(memberActions.getMemberRequest());

        const data = await axios.get(`${route}/details/${memberId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-member-details-res-data', data.data);
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

export const deleteMember = (memberId, token) => async (dispatch) => {
    try {
        console.log("delete-memberData", memberId);
        dispatch(memberActions.deleteMemberRequest());

        const data = await axios.delete(
            `${route}/${memberId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('delete-member-res-data', data.data);
        dispatch(memberActions.deleteMemberSuccess(data.data));
    } catch (error) {
        console.log("delete-member-error", error)
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