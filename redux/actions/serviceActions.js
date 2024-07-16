import axios from "axios";
import { serviceActions } from "../slices/serviceSlice";
import { serverURL } from "../../config/config";


const route = `${serverURL}/service`

export const getMemberServices = (memberId, token) => async (dispatch) => {
    try {
        dispatch(serviceActions.getMemberServicesRequest());
        console.log('getMemberServiceRequest:', memberId)
        const data = await axios.get(`${route}/${memberId}`, {
            headers: {
                "authorization": token
            }
        });

        console.log('get-member-services-res-data', data.data);
        dispatch(serviceActions.getMemberServicesSuccess(data.data));
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
        dispatch(serviceActions.getMemberServicesFailure(errorMessage));
    }
};

