import axios from "axios";
import { getLogoutFn } from '@/contexts/auth-context.tsx';

const axiosInstance = axios.create({baseURL: "http://localhost:8000"});
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            const logout = getLogoutFn();
            if (logout) {
                logout();
            }
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;