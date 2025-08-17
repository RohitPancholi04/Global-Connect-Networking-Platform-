import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5003",
  withCredentials: true 
});

// JWT token ko headers me dalne ke liye interceptor
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default api;




