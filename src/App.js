import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { lazy, useEffect } from "react";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";

import Footer from "./components/Footer";
import { ChakraProvider } from "@chakra-ui/react";
import FormComponent from "./pages/Form";
import Login from "./components/Login";
import ForgetPassword from "./components/ForgetPassword";
import NotFound from "./pages/404";
import StudentDashboard from "./pages/Student";
import ChangePassword from "./components/ChangePassword";
import Courses from "./components/courses";
import StudentProfile from "./components/StudentProfile";
import AdminLinks from "./components/AdminLinks";
import StudentTable from "./components/StudentTable";
import CourseForm from "./components/CourseForm";
import ManageCourses from "./components/ManageCourses";
import AdminPassword from "./components/AdminPassword";
import EditCourse from "./components/EditCourse";
import AdminDashboard from "./pages/Admin";
import { AdminAuth, StudentAuth } from "./auth/RequireAuth";
import { useDispatch, useSelector } from "react-redux";
import SignupModal from "./components/Modal";
function App() {
  const { role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "localstorage" });
  }, []);
  return (
    <ChakraProvider>
      {/* <Router> */}
      <NavBar />
      <Routes>
        <Route element={<StudentAuth auth={{ role }} />}>
          <Route path="/dashboard" element={<StudentDashboard />}>
            <Route path="" element={<Courses />} />
            <Route path="password" element={<ChangePassword />} />
            <Route path="profile" element={<StudentProfile />} />
          </Route>
        </Route>

        <Route element={<AdminAuth auth={{ role }} />}>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="" element={<AdminLinks />} />
            <Route path="student-table" element={<StudentTable />} />
            <Route path="course-form" element={<CourseForm />} />
            <Route path="manage-courses" element={<ManageCourses />} />
            <Route path="edit-course" element={<EditCourse />} />
            <Route path="change-password" element={<AdminPassword />} />
          </Route>
        </Route>

        <Route path="/account" element={<FormComponent />}>
          <Route path="" element={<SignupModal />} />
          <Route path="login" element={<Login />} />
          <Route path="forget_password" element={<ForgetPassword />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      {/* </Router> */}
    </ChakraProvider>
  );
}

export default App;
