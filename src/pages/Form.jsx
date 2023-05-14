import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function Form() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      bgColor="gray.800"
      minHeight={"calc(100vh - 301px)"}
      py="20px">
      <Outlet />
    </Box>
  );
}
export default Form;
