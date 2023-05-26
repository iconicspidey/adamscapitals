import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
const AdminDashboard = () => {
  const user = useSelector((state) => state);
  const { full_name, logged, role } = user.user;

  return (
    <Box py={10} minHeight="calc(100vh - 301px)" bgColor="gray.800">
      <Text fontSize={30} color="white" my={5} px={10}>
        Welcome {full_name}!
      </Text>
      <Outlet />
    </Box>
  );
};

export default AdminDashboard;
