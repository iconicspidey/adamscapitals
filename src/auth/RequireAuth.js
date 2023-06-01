import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AdminDashboard from "../pages/Admin";

function AdminAuth({ auth }) {
  const location = useLocation();
  const { role } = auth;

  return role === "admin" ? <Outlet /> : <Navigate to="/" />;
}
function StudentAuth({ auth }) {
  const location = useLocation();
  const { role } = auth;

  return role === "student" ? <Outlet /> : <Navigate to="/" />;
}

export { AdminAuth, StudentAuth };
