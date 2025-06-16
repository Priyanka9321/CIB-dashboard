import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // 👈 Import this
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import UserDashboard from "../pages/user/Dashboard";
import Profile from "../pages/user/Profile";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  const { user } = useAuth(); // 👈 Get current user role

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

      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
      </Route>

      {/* User Routes */}
      <Route
        path="/user/*"
        element={
          <PrivateRoute allowedRoles={["user"]}>
            <UserLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Public Routes */}
      <Route path="/unauthorized" element={<h1>Unauthorized - 403</h1>} />
      <Route path="/login" element={<h1>Login Page (fake)</h1>} />
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
