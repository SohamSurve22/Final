import axios from "axios";

// Base API URL - change port here if needed
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Auth APIs
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Product APIs
export const getProducts = (search = "") =>
  API.get(`/products?search=${search}`);
export const getProductById = (id) => API.get(`/products/${id}`);
export const addProduct = (data) => API.post("/products", data);

// Order APIs
export const placeOrder = (data) => API.post("/orders", data);
export const getOrders = (userId) => API.get(`/orders/${userId}`);
