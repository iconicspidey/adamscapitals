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
  useToast,
  ButtonGroup,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import axiosFetch from "./../configs/axiosConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

const CourseForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const user = useSelector((state) => state);
  const { token } = user.user;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [course, setCourse] = useState({
    plan: "",
    price: "",
    description: "",
  });
  const [errors, setError] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourse((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const formSubmit = async (event) => {
    event.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    setLoading(true);
    try {
      const response = await axiosFetch().post("/create-course", course, {
        Headers: headers,
      });
      toast({
        isClosable: true,
        duration: 5000,
        status: "success",
        description: "A course has been created successfully",
      });
      setCourse(() => ({ description: "", plan: "", price: "" }));
      setLoading(false);
      navigate("/admin");
    } catch (error) {
      const { data, status } = error.response;
      if (status == 400) {
        setError(data);
      }
      if (status == 401) {
        dispatch({ type: "logout" });
        navigate("/");
      }
    }
    setLoading(false);
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
      <form onSubmit={formSubmit}>
        <Flex direction="column">
          <FormControl id="planName" isInvalid={errors.plan} mb="4">
            <FormLabel color="white">Plan Name</FormLabel>
            <Input
              required
              color="white"
              name="plan"
              value={course.plan}
              onChange={handleChange}
              placeholder="Enter plan name"
            />
            <FormErrorMessage>
              <FormErrorIcon />
              {errors.plan}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            id="courseDescription"
            isInvalid={errors.description}
            mb="4">
            <FormLabel color="white">Course Description</FormLabel>
            <Textarea
              required
              color="white"
              name="description"
              value={course.description}
              onChange={handleChange}
              placeholder="Enter course description"
            />
            <FormErrorMessage>
              <FormErrorIcon />
              {errors.description}
            </FormErrorMessage>
          </FormControl>

          <FormControl id="coursePrice" isInvalid={errors.plan} mb="4">
            <FormLabel color="white">Course Price</FormLabel>
            <Input
              color="white"
              type="number"
              required
              placeholder="Enter course price"
              name="price"
              value={course.price}
              onChange={handleChange}
            />
            <FormErrorMessage>
              <FormErrorIcon />
              {errors.price}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <ButtonGroup display={"flex"} justifyContent={"space-between"}>
          <Button
            onClick={() => navigate("/admin")}
            colorScheme={"yellow"}
            leftIcon={<ArrowBackIcon />}>
            Back
          </Button>
          <Button isLoading={loading} type="submit" colorScheme="whatsapp">
            Submit
          </Button>
        </ButtonGroup>
      </form>
    </Box>
  );
};

export default CourseForm;
