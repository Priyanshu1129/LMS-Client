import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchToken = async () => {
    const token = await AsyncStorage.getItem("token");
    
    return token;
}

export const fetchData = async () => {
    const data = await AsyncStorage.getItem("data");

    return data;
}