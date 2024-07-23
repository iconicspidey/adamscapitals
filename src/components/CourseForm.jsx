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
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import axiosFetch from "./../configs/axiosConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRef } from "react";
const CourseForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const user = useSelector((state) => state);
  const dateInput = useRef();
  const { token } = user.user;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [course, setCourse] = useState({
    code: "",
    date: today,
    price: "",
    plan: "",
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
    console.log(course);
    setLoading(true);
    try {
      const response = await axiosFetch().post("/coupon", course, {
        Headers: headers,
      });
      toast({
        isClosable: true,
        duration: 5000,
        status: "success",
        description: "A course has been created successfully",
      });

      navigate("/admin");
    } catch (error) {
      const errorMessage = error.response.data;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      mt="8"
      p="6"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <form onSubmit={formSubmit}>
        <Text textAlign="center" color="gray">
          COUPON
        </Text>
        <Flex direction="column">
          <FormControl id="planName" isInvalid={errors?.code} mb="4">
            <FormLabel color="white">Coupon Code</FormLabel>
            <Input
              required
              color="white"
              name="code"
              type="text"
              value={course.code}
              onChange={handleChange}
              placeholder="Enter Coupon Code"
            />
            <FormErrorMessage>
              <FormErrorIcon />
              {errors?.code}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="coursePrice" isInvalid={errors?.price} mb="4">
            <FormLabel color="white">Coupon Price</FormLabel>
            <Input
              color="white"
              type="number"
              required
              placeholder="Enter Coupon price"
              name="price"
              value={course.price}
              onChange={handleChange}
            />
            <FormErrorMessage>
              <FormErrorIcon />
              {errors?.price}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="coursePrice" isInvalid={errors?.date} mb="4">
            <FormLabel color="white">Expiration Date</FormLabel>
            <Input
              type="date"
              min={today}
              name="date"
              onChange={handleChange}
              color={"white"}
            />
            <FormErrorMessage>
              <FormErrorIcon />
              {errors?.date}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="coursePrice" isInvalid={errors.plan} mb="4">
            <FormLabel color="white"> Mentorship Type </FormLabel>
            <Select
              icon={<ArrowDownIcon />}
              color="white"
              // placeholder="Select option"
              name="plan"
              value={course.plan}
              backgroundColor="gray.800"
              onChange={handleChange}
              // defaultValue={today}
            >
              <option style={{ backgroundColor: "#1a202c" }} value="">
                Select Mentorship Type
              </option>
              <option
                style={{ backgroundColor: "#1a202c" }}
                value="one-to-many"
              >
                One To Many
              </option>
              <option style={{ backgroundColor: "#151e30" }} value="one-to-one">
                One To One
              </option>
            </Select>
            <FormErrorMessage>
              <FormErrorIcon />
              {errors?.plan}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <ButtonGroup display={"flex"} justifyContent={"space-between"}>
          <Button
            onClick={() => navigate("/admin")}
            colorScheme={"yellow"}
            leftIcon={<ArrowBackIcon />}
          >
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
