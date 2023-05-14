import { Box, Heading } from "@chakra-ui/react";
import StudentSideBar from "../components/studentSideBar";
import { Outlet } from "react-router-dom";

function StudentDashboard() {
  return (
    <Box
      p="8"
      position="relative"
      minHeight={"calc(100vh - 301px)"}
      bgColor="gray.800">
      <StudentSideBar />
      <Heading color="white" as="h1" mb="8">
        Welcome, spidey!
      </Heading>
      <Outlet />
    </Box>
  );
}
export default StudentDashboard;
