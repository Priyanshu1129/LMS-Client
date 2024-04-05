import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    
    return token;
}

export const getData = async () => {
    const data = await AsyncStorage.getItem("data");

    return data;
}