import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
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
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);