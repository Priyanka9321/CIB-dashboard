import { Link, Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <h2>User Panel</h2>
      <nav>
        <Link to="dashboard">Dashboard</Link> |{" "}
        <Link to="profile">Profile</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default UserLayout;
