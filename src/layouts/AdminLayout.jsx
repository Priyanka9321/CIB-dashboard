import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <h2>Admin Panel</h2>
      <nav>
        <Link to="dashboard">Dashboard</Link> |{" "}
        <Link to="users">Users</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
