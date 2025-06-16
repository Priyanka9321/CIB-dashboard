import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar fixed on left */}
      <Sidebar />

      {/* Main content scrollable */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
