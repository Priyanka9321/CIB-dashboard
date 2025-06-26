import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import ForgotPassword from "../components/ForgotPassword";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* 🔁 Redirect based on role */}
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
      {/* Role-Based Protected Routes */}
      {AdminRoutes()}
      {UserRoutes()}
      {/* Public Routes */}
      <Route path="/sign-up" element={<SignUp />} /> {/* ✅ Added */}
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/unauthorized" element={<h1>Unauthorized - 403</h1>} />
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
