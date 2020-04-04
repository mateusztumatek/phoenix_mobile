import axios from 'axios';
import config from '../config';
// Create axios instance
const service = axios.create({
    baseURL: config.api_url,
    timeout: 10000, // Request timeout
    withCredentials: true
});

// Request intercepter
service.interceptors.request.use(
    config => {
        config.headers['ajax'] = 1;
        return config;
    },
    error => {
        // Do something with request error
        Promise.reject(error);
    }
);

// response pre-processing
service.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        let message = error.message;
        if (error.response && error.response.data && error.response.data.message) {
            message = error.response.data.message;
        }

        return Promise.reject(error);
    },
);

export default service;
