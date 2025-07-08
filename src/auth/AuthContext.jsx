import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken') || sessionStorage.getItem('authToken') || '');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("AuthContext - Decoded JWT:", decoded); // Debug: Log decoded token
        if (decoded.exp * 1000 > Date.now()) {
          // Map database/JWT fields to expected user object fields
          setUser({
            ...decoded,
            role: decoded.userRole || decoded.role || 'user', // Normalize role
            name: decoded.fullName || decoded.name || 'Unknown User', // Map fullName to name
            email: decoded.userEmail || decoded.email || 'No email', // Map userEmail to email
          });
        } else {
          console.log("Token expired, clearing storage");
          setToken('');
          setUser(null);
          localStorage.removeItem('authToken');
          sessionStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        setToken('');
        setUser(null);
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
      }
    } else {
      console.log("No token found");
      setUser(null);
    }
  }, [token]);

  const login = (newToken, keepLoggedIn) => {
    console.log("AuthContext - Logging in with token:", newToken, "keepLoggedIn:", keepLoggedIn);
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    if (keepLoggedIn) {
      localStorage.setItem('authToken', newToken);
    } else {
      sessionStorage.setItem('authToken', newToken);
    }
    setToken(newToken);
  };

  const logout = () => {
    console.log("AuthContext - Logging out");
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    setToken('');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};