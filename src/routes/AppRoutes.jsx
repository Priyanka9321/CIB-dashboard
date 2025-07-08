import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import ForgotPassword from "../components/ForgotPassword";
import ResetPasswordForm from "../components/ResetPassword";
import CongratulationsPopup from "../components/CongratulationsPopup";

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("AppRoutes - user:", user);
  console.log("AppRoutes - user.userRole:", user?.userRole); // Updated to userRole

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <Navigate to="/sign-in" />
            ) : user.userRole?.toLowerCase() === "admin" ? ( // Updated to userRole
              <Navigate to="/admin/dashboard" />
            ) : user.userRole?.toLowerCase() === "user" ? ( // Updated to userRole
              <Navigate to="/user/dashboard" />
            ) : (
              <Navigate to="/sign-in" />
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
      {user && user.userRole?.toLowerCase() === "user" && <CongratulationsPopup />} {/* Updated to userRole */}
    </>
  );
};

export default AppRoutes;