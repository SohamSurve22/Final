import axios from "axios";

// API Base URL Setup
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically inject JWT token into requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
