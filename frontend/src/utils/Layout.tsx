import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const Layout = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="flex min-h-screen flex-col">
      {!hideNavbar && <Navbar />}
      <Outlet />
    </div>
  );
};

export default Layout;
