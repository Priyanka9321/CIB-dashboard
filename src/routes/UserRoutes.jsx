// src/routes/UserRoutes.jsx
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import UserLayout from "../layouts/UserLayout";
import UserDashboard from "../pages/user/Dashboard";
import Profile from "../pages/user/Profile";
import MembershipStatus from "../pages/user/MembershipStatus";

import Certificate from "../pages/user/Certificate";
import UpdateProfile from "../pages/user/UpdateProfile";
import DonationForm from "../pages/user/Donation";
import MembershipReceipt from "../pages/user/MembershipReceipt";
import DonationReceipt from "../pages/user/DonationReceipt";
import MembershipRegistrationForm from "../pages/user/MembershipRegistrationForm";


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
      <Route path="apply-membership" element={<MembershipRegistrationForm />} />

      <Route path="certificate" element={<Certificate />} />
      <Route path="update-profile" element={<UpdateProfile />} />
      <Route path="donate" element={<DonationForm />} />
      <Route path="receipt/membership" element={<MembershipReceipt />} />
      <Route path="receipt/donation" element={<DonationReceipt />} />


    </Route>
  );
};

export default UserRoutes;