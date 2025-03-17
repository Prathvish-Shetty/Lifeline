import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Important for sending cookies with requests
  headers: {
      'Content-Type': 'application/json'
  }
});

// Add a request interceptor to dynamically set Authorization header
API.interceptors.request.use((config) => {
  const authData = JSON.parse(localStorage.getItem("auth")); // Assuming token is stored in localStorage
  if (authData?.accessToken) {
    config.headers.Authorization = `Bearer ${authData.accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


export default API