import { createContext, useState, useEffect } from "react";
import api from "../lib/axios.js";

// Create Context
export const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({} ); // logged-in user data
  const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen]= useState(false)
  
  
  const updateProfile = async (formData) => {
    try {
        setLoading(true)
      const token = localStorage.getItem("token");
      const res = await api.put("/api/users/update", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data.user); // update context state
      localStorage.setItem("userData", res.data.user)
      return { success: true, user: res.data.user };
    } catch (error) {
      console.error("Profile update failed:", error);
      return { success: false, message: error.response?.data?.message || "Error" };
    }
  };



  return (
    <UserContext.Provider value={{ user, updateProfile,isOpen,setIsOpen }}>
      {children}
    </UserContext.Provider>
  );
};
