import axios from "axios";

export const baseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;
const http = axios.create({
    baseURL
});

http.interceptors.request.use(
    (config) => {
        config.headers['Autorization'] = `Bearer ${localStorage.getItem('jwt')}`
        return config;
    },
    error => Promise.reject(error)
);

export default http;