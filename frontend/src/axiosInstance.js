import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const axiosInstance = axios.create({
    baseURL: baseURL,
});

export const getFullURL = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${baseURL}${path}`;
};

export default axiosInstance;
