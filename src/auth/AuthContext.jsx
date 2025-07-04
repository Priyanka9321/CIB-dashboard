import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const baseURL = import.meta.env.VITE_BASE_URL;

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      axios
        .get(`${baseURL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("Restored user:", response.data);
          const userInfo = {
            name: response.data.user?.name || "User",
            email: response.data.user?.email || "",
            role: response.data.user?.role?.toLowerCase() || "user",
          };
          setUser(userInfo);
        })
        .catch((err) => {
          console.error("Failed to restore user:", err);
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false); 
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);