import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";

const AdminRoutes = () => {
  return (
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
  );
};

export default AdminRoutes;
