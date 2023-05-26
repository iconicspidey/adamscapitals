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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminPassword = () => {
  const { user_id, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleForm = async (e) => {
    e.preventDefault();
    const { confirmPassword, newPassword } = password;
    if (confirmPassword != newPassword) {
      return setError((prev) => {
        const msg = "password do not match";
        return {
          ...prev,
          newPassword: msg,
          confirmPassword: msg,
        };
      });
    }
    setLoading(true);
    try {
      const { oldPassword, newPassword } = password;
      const body = { oldPassword, newPassword };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosFetch().post(
        `/change-password/${user_id}`,
        body,
        {
          headers,
        }
      );
      setLoading(false);

      toast({
        title: "Password changed successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        dispatch({ type: "logout" });
        navigate("/account");
      }, 2000);
    } catch (error) {
      const { status, data } = error.response;
      if (status == 404) {
        setError((prev) => {
          return {
            ...prev,
            oldPassword: "old password is incorrect",
          };
        });
      }
      if (status == 400) {
        setError((prev) => ({ ...prev, data }));
      }
      if (status == 401) {
        dispatch({ type: "logout" });
        navigate("/account");
      }
    }
    setLoading(false);
  };
  const handleInputs = (event) => {
    const { name, value } = event.target;
    const { confirmPassword, newPassword, oldPassword } = error;
    if (confirmPassword || newPassword || oldPassword) {
      setError(() => ({
        confirmPassword: "",
        newPassword: "",
        oldPassword: "",
      }));
    }
    setPassword((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
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
            name="oldPassword"
            value={password.oldPassword}
            onChange={handleInputs}
          />
          <FormErrorMessage>
            <FormErrorIcon mr={2} />
            {error.oldPassword}
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
            name="newPassword"
            value={password.newPassword}
            onChange={handleInputs}
          />
          <FormErrorMessage>
            <FormErrorIcon mr={2} />
            {error.newPassword}
          </FormErrorMessage>
        </FormControl>
        <FormControl mb={4} isInvalid={error.confirmPassword}>
          <FormLabel color="white">Confirm Password</FormLabel>
          <Input
            isRequired
            type="password"
            backgroundColor="gray.900"
            placeholder="Comfirm Password"
            color="#f2f2f2"
            value={password.confirmPassword}
            name="confirmPassword"
            onChange={handleInputs}
          />
          <FormErrorMessage>
            <FormErrorIcon mr={2} />
            {error.confirmPassword}
          </FormErrorMessage>
        </FormControl>
        <Button isLoading={loading} colorScheme="whatsapp" type="submit">
          Change Password
        </Button>
      </form>
    </Box>
  );
};

export default AdminPassword;
