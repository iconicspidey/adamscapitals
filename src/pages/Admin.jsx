import { Box, Text } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
const AdminDashboard = () => {
  return (
    <Box py={10} minHeight="calc(100vh - 301px)" bgColor="gray.800">
      <Text fontSize={30} color="white" my={5} px={10}>
        Welcome spidey!
      </Text>
      <Outlet />
    </Box>
  );
};

export default AdminDashboard;
