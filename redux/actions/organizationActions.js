import axios from "axios";
import { organizationActions } from "../slices/organizationSlice";
import { serverURL } from "../../config/config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const route = `${serverURL}/organization/`

export const getOrganization = (orgId, token) => async (dispatch) => {
    try {
        console.log("get-org-Data", orgId);
        dispatch(organizationActions.organizationDetailsRequest());

        const data = await axios.get(`${route}/${orgId}`, {
            headers: {
                "authorization": token
            }
        });
        console.log('get-organization-res-data', data.data);
        dispatch(organizationActions.organizationDetailsSuccess(data.data));
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
        dispatch(organizationActions.organizationDetailsFailure(errorMessage));
    }
};

export const updateOrganization = (id, updateData, token) => async (dispatch) => {
    try {
        console.log("updateData", updateData);
        dispatch(organizationActions.updateOrganizationDetailsRequest());

        const data = await axios.put(
            `${route}/${id}`,
            updateData,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('update-organization-res-data', data.data);
        dispatch(organizationActions.updateOrganizationDetailsSuccess(data.data));
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
        dispatch(organizationActions.updateOrganizationDetailsFailure(errorMessage));
    }
};

