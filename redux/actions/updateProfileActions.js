import axios from "axios";
import { updateProfileActions } from "../slices/updateProfileSlice";
import { serverURL } from "../../config/config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const route = `${serverURL}/`

export const updateProfile = (updateData) => async (dispatch) => {
    try {
        console.log("updateData", updateData);
        dispatch(updateProfileActions.updateProfileRequest());

        const data = await axios.post(
            `${route}/update-profile`,
            loginData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log('update-profile-res-data', data);
        if (data.status == 200) {
            AsyncStorage.setItem("data", JSON.stringify(data.data));
        }
        dispatch(updateProfileActions.updateProfileSuccess(data.data));
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
        dispatch(updateProfileActions.updateProfileFailure(errorMessage));
    }
};

