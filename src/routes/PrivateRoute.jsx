import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { usePopup } from "../context/PopupContext";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const { isFormSubmitted } = usePopup();
  const location = useLocation();

  // Debugging logs
  console.log("PrivateRoute - user:", user);
  console.log("PrivateRoute - user.userRole:", user?.userRole); // Updated to userRole
  console.log("PrivateRoute - allowedRoles:", allowedRoles);
  console.log("PrivateRoute - pathname:", location.pathname);

  // Check authentication
  if (!user) {
    console.log("Redirecting to /sign-in: No user found");
    return <Navigate to="/sign-in" replace />;
  }

  // Check role authorization
  const userRole = user.userRole?.toLowerCase() || ""; // Updated to userRole
  if (!allowedRoles.includes(userRole)) {
    console.log("Redirecting to /unauthorized: Role not allowed");
    return <Navigate to="/unauthorized" replace />;
  }

  // Skip isFormSubmitted check for admin routes
  if (userRole === "admin") {
    console.log("Allowing admin access to", location.pathname);
    return children;
  }

  // Allow access to /user/apply-membership regardless of form submission
  if (location.pathname === "/user/apply-membership") {
    console.log("Allowing access to /user/apply-membership");
    return children;
  }

  // Restrict other routes if form is not submitted
  if (!isFormSubmitted) {
    console.log("Redirecting to /user/apply-membership: Form not submitted");
    return <Navigate to="/user/apply-membership" replace />;
  }

  return children;
};

export default PrivateRoute;