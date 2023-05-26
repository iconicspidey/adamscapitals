import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  FormErrorMessage,
  FormErrorIcon,
} from "@chakra-ui/react";
import axiosFetch from "../configs/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function StudentProfile() {
  const toast = useToast();
  const dispatch = useDispatch();
  const { user_id, token, full_name, email } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    fullName: full_name || "",
    email: email || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ fullName: "", email: "" });
  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const headers = {
        "content-type": "application/json",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axiosFetch().post(
        `/student-profile/${user_id}`,
        profile,
        { headers }
      );
      toast({
        title: "profile update",
        description: "user profile has been update successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      dispatch({ type: "logout" });
      navigate("/account");
    } catch (error) {
      const { status, data } = error.response;
      if (status == 400) {
        setError(data);
      }
      if (status == 401) {
        dispatch({ type: "logout" });
        navigate("/account");
      }
      setLoading(false);
    }
  };
  const inputFields = (event) => {
    const { name, value } = event.target;
    const { email, fullName } = error;
    if (email || fullName) {
      setError(() => ({ fullName: "", email: "" }));
    }
    setProfile((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <>
      <Box maxW="500px" m="auto">
        <form onSubmit={handleForm} action="">
          <FormControl isInvalid={error.fullName} mb={4}>
            <FormLabel color="white">Full Name</FormLabel>
            <Input
              backgroundColor="gray.900"
              color="#f2f2f2"
              placeholder="Full Name"
              isRequired
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={inputFields}
            />
            <FormErrorMessage>
              <FormErrorIcon _loading={true} />
              {error.fullName}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={error.email} mb={4}>
            <FormLabel color="white">Email</FormLabel>
            <Input
              isRequired
              backgroundColor="gray.900"
              color="#f2f2f2"
              placeholder="Email"
              type="text"
              name="email"
              value={profile.email}
              onChange={inputFields}
            />
            <FormErrorMessage>
              <FormErrorIcon _loading={true} />
              {error.email == "must be a valid"
                ? `${error.email} email`
                : `email ${error.email}`}
            </FormErrorMessage>
          </FormControl>
          <Button
            isLoading={loading}
            loadingText="submiting"
            colorScheme="whatsapp"
            type="submit">
            Change Profile
          </Button>
        </form>
      </Box>
    </>
  );
}

export default StudentProfile;
