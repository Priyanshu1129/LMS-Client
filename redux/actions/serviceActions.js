import axios from "axios";
import { serviceActions } from "../slices/serviceSlice";
import { serverURL } from "../../config/config";


const route = `${serverURL}/service`

export const getMemberServices = (memberId, token) => async (dispatch) => {
    try {
        console.log('getMemberServiceRequest:', memberId)
        dispatch(serviceActions.getMemberServicesRequest());
        const data = await axios.get(`${route}/member/${memberId}`, {
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

export const updateService = async (serviceData, token, serviceId) => async (dispatch) =>{
    console.log("updating-service-detail-in-action", serviceData)
    const formData = new FormData();
    Object.entries(serviceData).forEach(([key, value]) => {
            formData.append(key, value);
    });
    console.log("update-service-form-data " , formData)
    try {
        console.log('updateServiceRequest:', serviceId)
        dispatch(serviceActions.updateServiceRequest());
        const data = await axios.put(`${route}/${serviceId}`,
            formData,
             {
            headers: {
                "authorization": token
            },
        });
        
        console.log('update-member-services-res-data----', data.data);
        dispatch(serviceActions.updateServiceSuccess(data.data));
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
        dispatch(serviceActions.updateServiceFailure(errorMessage));
    }
}


export const deAllocateServices = (serviceId, token) => async (dispatch) => {
    try {
        console.log('deAlllocateServiceRequest:', serviceId)
        dispatch(serviceActions.deAllocateServiceRequest());
        const data = await axios.post(`${route}/de_allocate/${serviceId}`, {
            headers: {
                "authorization": token
            }
        });

        console.log('get-member-services-res-data', data.data);
        dispatch(serviceActions.deAllocateServiceSuccess(data.data));
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
        console.log("dealloate service error",errorMessage)
        dispatch(serviceActions.deAllocateServiceFailure(errorMessage));
    }
};
