import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { usePopup } from "../context/PopupContext";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const { isFormSubmitted } = usePopup();
  const location = useLocation();

  // Check authentication
  if (!user) return <Navigate to="/sign-in" replace />;

  // Check role authorization
  if (!allowedRoles.includes(user.role?.toLowerCase())) return <Navigate to="/unauthorized" replace />;

  // Skip isFormSubmitted check for admin routes
  if (user.role?.toLowerCase() === "admin") return children;

  // Allow access to /user/apply-membership regardless of form submission
  if (location.pathname === "/user/apply-membership") return children;

  // Restrict other routes if form is not submitted
  if (!isFormSubmitted) return <Navigate to="/user/apply-membership" replace />;

  return children;
};

export default PrivateRoute;