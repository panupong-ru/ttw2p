import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || '';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors here
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response Error:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request Error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Create dynamic API client
const createApiClient = (endpoint: string) => ({
  get: (config?: any) => axiosInstance.get(`/api/${endpoint}`, config),
  post: (data: any, config?: any) => axiosInstance.post(`/api/${endpoint}`, data, config),
  put: (data: any, config?: any) => axiosInstance.put(`/api/${endpoint}`, data, config),
  delete: (config?: any) => axiosInstance.delete(`/api/${endpoint}`, config),
});

// Create a proxy handler to dynamically create API clients
const handler = {
  get: (target: any, prop: string) => {
    if (!target[prop]) {
      target[prop] = createApiClient(prop);
    }
    return target[prop];
  },
};

// Create the base HTTP client with dynamic endpoint creation
export const baseHttpClient = new Proxy({}, handler);
