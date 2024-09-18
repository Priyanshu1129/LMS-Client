import axios from "axios";
import { profileActions } from "../slices/profileSlice";
import { serverURL } from "../../config/config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const route = `${serverURL}/owner`

export const getProfile = (ownerId) => async(dispatch) => {
    try {
        console.log("getprofile-woner-id", ownerId);
        const data = await axios.get(
            `${route}/${ownerId}`,
            {
                headers: {
                    "authorization": token
                },
            }
        );
        console.log('get-profile-res-data', data);
        
        if (data.status == 200) {
            AsyncStorage.setItem("data", JSON.stringify(data.data));
        }
        dispatch(profileActions.updateProfileSuccess(data.data));


    }catch(error){
        console.log("errors", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(profileActions.updateProfileFailure(errorMessage));
    }
}

export const updateProfile = (updateData, token, ownerId) => async (dispatch) => {
    try {
        console.log("update-profile-updatedData", updateData);
        console.log("update-profile-owner-Id", ownerId);
        dispatch(profileActions.updateProfileRequest());
        const formData = new FormData();
        Object.entries(updateData).forEach(([key, value])=>{
            if(key != 'avatarUri'){
                formData.append(key, value);
            }
        })
         
        if (updateData?.avatarUri) {
            const fileName = updateData.avatarUri.split('/').pop();
            // Determine file type based on file extension
            const fileType = fileName.split('.').pop();
    
            // Append avatar file to FormData
            formData.append("avatar", {
                uri: updateData.avatarUri,
                type: `image/${fileType}`,
                name: fileName
            });
        }  
         
        console.log("update-profile-form-data", formData)
        const data = await axios.put(
            `${route}/${ownerId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authorization": token
                },
            }
        );
        console.log('update-profile-res-data', data);
        console.log('data.data-------', data.data)
        if (data.status == 200) {
            AsyncStorage.setItem("data", JSON.stringify(data.data));
        }
        dispatch(profileActions.updateProfileSuccess(data.data));
    } catch (error) {
        console.log("errors", error)
        let errorMessage = "An error occurred";
        if (error.response) {
            errorMessage = error.response.data.message || "Server error";
        } else if (error.request) {
            errorMessage = "Network error";
        } else {
            errorMessage = error.message || "Unknown error";
        }
        dispatch(profileActions.updateProfileFailure(errorMessage));
    }
};

