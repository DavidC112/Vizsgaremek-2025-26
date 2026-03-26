import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";
import { useUserContext } from "../context/UserContext";

export const PublicOnlyRoute = () => {
  const { accessToken } = useAuthContext();

  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export const ProtectedRoute = () => {
  const { accessToken } = useAuthContext();

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export const AdminRoute = () => {
  const { accessToken } = useAuthContext();
  const { singleUser } = useUserContext();

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }
  if (singleUser?.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
