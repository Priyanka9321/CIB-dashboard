import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import UserLayout from "../layouts/UserLayout";
import UserDashboard from "../pages/user/Dashboard";
import Profile from "../pages/user/Profile";
import MembershipStatus from "../pages/user/MembershipStatus";
import GenerateIdCard from "../pages/user/GenerateIdCard";
import Certificate from "../pages/user/Certificate";
import UpdateProfile from "../pages/user/UpdateProfile";
import DonationForm from "../pages/user/Donation";
import MembershipReceipt from "../pages/user/MembershipReceipt";
import DonationReceipt from "../pages/user/DonationReceipt";

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
      <Route path="certificate" element={<Certificate />} />
      <Route path="update-profile" element={<UpdateProfile />} />
      <Route path="donate" element={<DonationForm />} />
      {/* ✅ New Receipt Sub-Routes */}
     <Route path="receipt/membership" element={<MembershipReceipt />} />
      <Route path="receipt/donation" element={<DonationReceipt />} />
    </Route>
  );
};

export default UserRoutes;
