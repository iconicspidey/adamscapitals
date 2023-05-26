import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AdminDashboard from "../pages/Admin";

function AdminAuth({ auth }) {
  const location = useLocation();
  const { logged, role } = auth;

  return (
    <>
      {logged ? (
        role == "admin" ? (
          <AdminDashboard />
        ) : (
          <Navigate to="/dashboard" state={{ from: location }} replace />
        )
      ) : (
        <Navigate to="/account" state={{ from: location }} replace />
      )}
    </>
  );
}
function StudentAuth({ auth }) {
  const location = useLocation();
  const { logged, role } = auth;
  return (
    <>
      {logged ? (
        role == "student" ? (
          <Outlet />
        ) : (
          <Navigate to="/account" state={{ from: location }} replace />
        )
      ) : (
        <Navigate to="/account" state={{ from: location }} replace />
      )}
    </>
  );
}

export { AdminAuth, StudentAuth };
