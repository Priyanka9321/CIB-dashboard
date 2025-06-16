import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import UserLayout from "../layouts/UserLayout";
import UserDashboard from "../pages/user/Dashboard";
import Profile from "../pages/user/Profile";
import MembershipStatus from "../pages/user/MembershipStatus";
import GenerateIdCard from "../pages/user/GenerateIdCard";

const UserRoutes = () => {
  return (
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
      <Route path="membership" element={<MembershipStatus />} />
      <Route path="idcard" element={<GenerateIdCard />} />
    </Route>
  );
};

export default UserRoutes;
