import axios, {AxiosRequestConfig} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseURL = 'http://192.168.1.35:8080/';

export const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.request.use(async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const token = await AsyncStorage.getItem('@token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});