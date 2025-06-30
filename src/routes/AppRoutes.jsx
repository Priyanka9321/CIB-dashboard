import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import ForgotPassword from "../components/ForgotPassword";
import ResetPasswordForm from "../components/ResetPassword";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          !user ? (
            <Navigate to="/sign-up" />
          ) : user.role === "admin" ? (
            <Navigate to="/admin/dashboard" />
          ) : user.role === "user" ? (
            <Navigate to="/user/dashboard" />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      />
      {AdminRoutes()}
      {UserRoutes()}
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPasswordForm />} />
      <Route path="/unauthorized" element={<h1>Unauthorized - 403</h1>} />
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
