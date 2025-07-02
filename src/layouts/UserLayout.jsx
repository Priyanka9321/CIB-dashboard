import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import CongratulationsPopup from "../components/CongratulationsPopup"
const UserLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fixed on left */}
      <Sidebar />

      {/* Main content scrollable */}
      <div className="flex-1 overflow-y-auto bg-gray-100">
        <Navbar />
        <div className="min-h-screen bg-gray-100">
          <main>
            <Outlet />
          </main>
          <CongratulationsPopup />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
