import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5002/api", 
  withCredentials: true, 
});

// JWT token ko headers me dalne ke liye interceptor
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;




