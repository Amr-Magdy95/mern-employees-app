import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuthContext();
  const location = useLocation();
  return auth?.roles?.find((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthrozied" state={{ from: location }} replace />
  ) : (
    <Navigate state={{ from: location }} replace />
  );
};

export default RequireAuth;
