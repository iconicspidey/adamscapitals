import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy } from "react";
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
import AdminDashboard from "./pages/Admin";
import StudentTable from "./components/StudentTable";
import AdminLinks from "./components/AdminLinks";
import CourseForm from "./components/CourseForm";
import ManageCourses from "./components/ManageCourses";
import EditCourse from "./components/EditCourse";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<FormComponent />}>
            <Route path="/account" element={<Login />} />
            <Route
              path="/account/forget_password"
              element={<ForgetPassword />}
            />
          </Route>
          <Route path="/dashboard" element={<StudentDashboard />}>
            <Route path="/dashboard" element={<Courses />} />
            <Route path="/dashboard/password" element={<ChangePassword />} />
            <Route path="/dashboard/profile" element={<StudentProfile />} />
          </Route>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="/admin" element={<AdminLinks />} />
            <Route path="/admin/student-table" element={<StudentTable />} />
            <Route path="/admin/course-form" element={<CourseForm />} />
            <Route path="/admin/manage-courses" element={<ManageCourses />} />
            <Route path="/admin/edit-course" element={<EditCourse />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
