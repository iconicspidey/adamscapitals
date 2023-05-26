import { Box, Text } from "@chakra-ui/react";
import StudentSideBar from "../components/studentSideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function StudentDashboard() {
  const { full_name, role } = useSelector((state) => state.user);

  return (
    <Box
      p="8"
      position="relative"
      minHeight={"calc(100vh - 301px)"}
      bgColor="gray.800">
      <StudentSideBar />
      <Text fontSize={30} color="white" my={5} px={10}>
        Welcome {full_name}!
      </Text>
      <Outlet />
    </Box>
  );
}
export default StudentDashboard;
