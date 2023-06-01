import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  FormErrorIcon,
  FormErrorMessage,
  Text,
  ButtonGroup,
} from "@chakra-ui/react";

import { WarningTwoIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosFetch from "../configs/axiosConfig";
import { useDispatch, useSelector } from "react-redux";

export default function EditCourse() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [course, setCourse] = useState(state);
  const [loading, setLoading] = useState(false);
  const { course_id, description, price, plan , channel , server } = course;
  const { token } = useSelector((state) => state.user);
  const [errors, setError] = useState({});
  const dispatch = useDispatch();
  const formSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosFetch().post(
        `/upadte-course/${course_id}`,
        { description, price, plan , server , channel },
        { headers }
      );
      const { status } = response;
      if (status == 200) {
        setLoading(false);
        navigate("/admin/manage-courses", { replace: true });
      }
    } catch (error) {
      const response = error.response;

      const { status, data } = response;
      if (status == 401) {
        dispatch({ type: "logout" });
        navigate("/", { replace: true });
      }
      if (status == 400) {
        setError(data);
      }
      setLoading(false);
    }
  };
  const cancel = () => {
    navigate("/admin/manage-courses", { replace: true });
  };
  const handleInput = (input) => {
    const { name, value } = input.target;
    setCourse((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <Box
      maxW="lg"
      mx="auto"
      mt="8"
      p="6"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg">
      <form onSubmit={formSubmit} action="">
        <Text textAlign={"center"} fontWeight={"bold"} color="white">
          EDIT  PLAN
        </Text>
        <Flex direction="column">
          <FormControl id="courseTitle" mb="4">
            <FormLabel color="white">Plan</FormLabel>
            <Input
              name="plan"
              onChange={handleInput}
              color="white"
              value={plan}
              placeholder="Enter course title"
              isInvalid={errors.plan}
            />
            <FormErrorMessage>
              <FormErrorIcon />
              {errors.plan}
            </FormErrorMessage>
          </FormControl>

          <FormControl id="courseDescription" mb="4">
            <FormLabel color="white">Course Description</FormLabel>
            <Textarea
              value={description}
              onChange={handleInput}
              name="description"
              required
              color="white"
              placeholder="Enter course description"
              isInvalid={errors.description}
            />
            <FormErrorMessage>
              <FormErrorIcon />
              {errors.description}
            </FormErrorMessage>
          </FormControl>

          <FormControl id="coursePrice" mb="4">
            <FormLabel color="white">Course Price</FormLabel>
            <Input
              value={price}
              name="price"
              onChange={handleInput}
              color="white"
              type="number"
              required
              placeholder="Enter course price"
              isInvalid={errors.price}
            />
            <FormErrorMessage>
              <FormErrorIcon />
              {errors.price}
            </FormErrorMessage>
          </FormControl>
           <FormControl id="coursePrice" isInvalid={errors.server} mb="4">
            <FormLabel color="white">Sever ID</FormLabel>
            <Input
              value={server}
              name="server"
              onChange={handleInput}
              color="white"
              type="text"
              required
              placeholder="Enter Server ID"
              isInvalid={errors.server}
            />
            <FormErrorMessage>
              <FormErrorIcon />
              {errors.server}
            </FormErrorMessage>
          </FormControl>
           <FormControl id="coursePrice" isInvalid={errors.channel} mb="4">
            <FormLabel color="white">Channel ID</FormLabel>
            <Input
              value={channel}
              name="channel"
              onChange={handleInput}
              color="white"
              type="price"
              required
              placeholder="Enter Server ID"
              isInvalid={errors.server}
            />
            <FormErrorMessage>
              <FormErrorIcon />
              {errors.channel}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <ButtonGroup display="flex" justifyContent={"space-between"}>
          <Button
            onClick={() => cancel()}
            leftIcon={<WarningTwoIcon />}
            colorScheme="yellow">
            Cancel
          </Button>
          <Button
            isLoading={loading}
            loadingText="Submitting"
            type="submit"
            colorScheme="whatsapp">
            Submit
          </Button>
        </ButtonGroup>
      </form>
    </Box>
  );
}
