
import { createContext, useContext } from 'react';

const AuthContext = createContext();

const fakeUser = {
  name: 'Priyanka',
  role: 'admin', // 👉 Change to 'user' to test user role
};

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ user: fakeUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
