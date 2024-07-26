import axios from "axios";

const baseUrl = 'http://127.0.0.1:8080'
const timeout = 5000

export const publicClient = axios.create({
    baseURL: baseUrl, // Replace with your API's base URL
    timeout: timeout, // You can set a timeout if needed
});

export const AuthClient = axios.create({
  baseURL: baseUrl,
  timeout: timeout,
})

// Add a request interceptor to include the token in the Authorization header
AuthClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
);