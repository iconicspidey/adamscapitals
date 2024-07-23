import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AdminDashboard from "../pages/Admin";
import useAuth from "../utils/adminAuth";
import { useEffect } from "react";

function AdminAuth({ auth }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const { error, isError, isLoading } = useAuth(token);

  useEffect(() => {
    if (isError) {
      dispatch({ type: "logout" });
      return <Navigate to="/" />;
    }
  }, [isError]);

  const { role } = auth;

  return role === "admin" ? <Outlet /> : <Navigate to="/" />;
}
function StudentAuth({ auth }) {
  const location = useLocation();
  const { role } = auth;

  return role === "student" ? <Outlet /> : <Navigate to="/" />;
}

export { AdminAuth, StudentAuth };
