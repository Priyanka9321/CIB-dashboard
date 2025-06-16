import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* 🔁 Redirect from "/" based on role */}
      <Route
        path="/"
        element={
          user?.role === "admin" ? (
            <Navigate to="/admin/dashboard" />
          ) : user?.role === "user" ? (
            <Navigate to="/user/dashboard" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* 🛠 Admin and User routes moved to separate files */}
      {AdminRoutes()}
      {UserRoutes()}

      {/* Public Routes */}
      <Route path="/unauthorized" element={<h1>Unauthorized - 403</h1>} />
      <Route path="/login" element={<h1>Login Page (fake)</h1>} />
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
