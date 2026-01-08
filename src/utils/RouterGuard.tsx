import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";

export const PublicOnlyRoute = () => {
  const {accessToken} = useAuthContext()

  if (accessToken) {
     return <Navigate to="/" replace />;
  }

  return <Outlet />
}

export const ProtectedRoute = () => {
  const { accessToken } = useAuthContext();


  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />
}