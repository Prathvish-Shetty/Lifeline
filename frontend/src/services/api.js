import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Important for sending cookies with requests
  headers: {
      'Content-Type': 'application/json'
  }
});


export default API
