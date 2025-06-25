import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import NewMembership from "../pages/admin/NewMembership";
import ActiveMembers from "../pages/admin/ActiveMembers";
import GenerateCertificate from "../pages/admin/GenerateCertificate"; 
import ActiveCertificate from "../pages/admin/ActiveCertificate";
import AllUserData from "../pages/admin/AllUserData"
import BlockedUser from "../pages/admin/BlockedUser";
import VisitorDonation from "../pages/admin/VisitorDonation";
import ReceiveDonation from "../pages/admin/ReceiveDonation";
import Receipt from "../pages/admin/Receipt";
import AddManager from "../pages/admin/AddManager";
import ActiveManager from "../pages/admin/ActiveManager";
import SendToSingleUser from "../pages/admin/SendToSingleUser";
import BlockedManager from "../pages/admin/BlockedManager";
import VisitorCertificate from "../pages/admin/VisitorCertificate";
import MembershipReceipt from "../pages/admin/MembershipReceipt";
import UserDonationReceipt from "../pages/admin/UserDonationReceipt";


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
      <Route path="newmembership" element={<NewMembership />} />
      <Route path="activemembers" element={<ActiveMembers />} />
      <Route path="generatecertificate" element={<GenerateCertificate/>} />
      <Route path="certificate" element={<VisitorCertificate/>} />
      <Route path="activecertificate" element={<ActiveCertificate/>} /> 
      <Route path="alluserdata" element={<AllUserData/>} />
      <Route path="blockedusers" element={<BlockedUser/>} />
      <Route path="visitordonation" element={<VisitorDonation/>} />

      <Route path="sendtosingleuser" element={<SendToSingleUser/>}/>



      <Route path="receivedonation" element={<ReceiveDonation/>}/>
      <Route path="receipt" element={<Receipt/>}/>

      <Route path="addmanager" element={<AddManager/>}/>
      <Route path="activemanager" element={<ActiveManager />} />
      <Route path="blockedmanager" element={<BlockedManager/>} />

      <Route path="membershipreceipt" element={<MembershipReceipt />} />
      <Route path="userdonationreceipt" element={<UserDonationReceipt/>} />




     
    </Route>
  );
};

export default AdminRoutes;
