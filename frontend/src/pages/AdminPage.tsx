import { Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className="from-primary-green-50 min-h-screen min-w-full bg-linear-to-b via-white to-blue-50">
      <Outlet />
    </div>
  );
};

export default AdminPage;
