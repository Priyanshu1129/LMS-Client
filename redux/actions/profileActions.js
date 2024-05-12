import axios from "axios";
import { profileActions } from "../slices/profileSlice";
import { serverURL } from "../../config/config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const route = `${serverURL}/`

export const updateProfile = (updateData, token) => async (dispatch) => {
    try {
        console.log("updateData", updateData);
        dispatch(profileActions.updateProfileRequest());

        const data = await axios.put(
            `${route}/update-profile`,
            updateData,
            {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token
                },
            }
        );
        console.log('update-profile-res-data', data);
        if (data.status == 200) {
            AsyncStorage.setItem("data", JSON.stringify(data.data));
        }
        dispatch(profileActions.updateProfileSuccess(data.data));
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
        dispatch(profileActions.updateProfileFailure(errorMessage));
    }
};

