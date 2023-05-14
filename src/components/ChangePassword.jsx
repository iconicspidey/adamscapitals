import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  FormErrorIcon,
  FormErrorMessage,
} from "@chakra-ui/react";
import axiosFetch from "../configs/axiosConfig";

const ChangePassword = () => {
  const toast = useToast();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    state: false,
  });

  const handleForm = async(e) => {
    e.preventDefault();
    if (confirmPassword === newPassword) {
      toast({
        title: "Password changed successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
   const response = await axiosFetch().post("/")
    setConfirmPassword("");
    setOldPassword("");
    setNewPassword("");
  };
  return (
    <Box maxW="500px" m="auto">
      <form onSubmit={handleForm} action="">
        <FormControl mb={4} isInvalid={error.oldPassword}>
          <FormLabel color="white">Old Password</FormLabel>
          <Input
            backgroundColor="gray.900"
            color="#f2f2f2"
            placeholder="Old Password"
            isRequired
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <FormErrorMessage>
            <FormErrorIcon mr={2} />
          </FormErrorMessage>
        </FormControl>
        <FormControl mb={4} isInvalid={error.newPassword}>
          <FormLabel color="white">New Password</FormLabel>
          <Input
            isRequired
            backgroundColor="gray.900"
            color="#f2f2f2"
            placeholder="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4} isInvalid={error.confirmPassword}>
          <FormLabel color="white">Confirm Password</FormLabel>
          <Input
            isRequired
            type="password"
            backgroundColor="gray.900"
            placeholder="Comfirm Password"
            color="#f2f2f2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="whatsapp" type="submit">
          Change Password
        </Button>
      </form>
    </Box>
  );
};

export default ChangePassword;
