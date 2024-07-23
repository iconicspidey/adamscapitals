import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  Spinner,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { Link as NavLink } from "react-router-dom";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import axiosFetch from "./../configs/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../redux-slice/coursesSlice";

const ManageCourses = () => {
  const mentorship = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });
  const fetchMentorship = async () => {
    const response = await axiosFetch().get("/mentorship");
    return response.data;
  };
  const { error, isFetching, data, isError, isRefetchError } = useQuery(
    "mentorships",
    fetchMentorship
  );
  const adjustLetters = (payloadd) => {
    const splitLetters = payloadd.split(" ");

    return splitLetters.map((word) => word.replace("-", " ")).join("");
  };

  return (
    <Box m={"auto"} maxW={{ base: "90%", md: "80%", lg: "70%", xl: "1200px" }}>
      <Heading as="h2" color="white" textAlign="center" mb={10}>
        Price Cards
      </Heading>
      <Flex
        justify="center"
        flexWrap={isLargeScreen ? "nowrap" : "wrap"}
        gap={isLargeScreen ? "10px" : "10px"}
      >
        {isFetching ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          data.map(({ id, price, description, title, type, strike_price }) => (
            <Box
              borderWidth="1px"
              borderRadius="lg"
              // overflow="hidden"
              p={6}
              flex={isLargeScreen ? "1" : "0 0 calc(100% - 20px)"}
              // mb={isLargeScreen ? 0 : 10}
              bg="gray.900"
              key={id}
            >
              <Box display={"flex"} gap={2} alignItems={"flex-end"}>
                <Heading as="h4" textTransform={"capitalize"} color="white">
                  {adjustLetters(type)}
                </Heading>
              </Box>
              <Flex>
                {/* <Heading></Heading> */}
                <Text color="white">{description}.</Text>
              </Flex>
              <Text color="white">
                Mentorship Type: {type.replace("-", " ")}{" "}
              </Text>

              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                my={2}
              >
                <Text color="white" fontSize={"1.3rem"}>
                  Price
                </Text>
                <Box display="flex" flexDir={"column"} alignItems={"center"}>
                  <Text
                    fontSize={"2rem"}
                    color="red.400"
                    textDecoration={"line-through"}
                    fontWeight={"bold"}
                  >
                    ${strike_price}
                  </Text>
                  <Text fontSize={"12px"} color="gray.100">
                    Original
                  </Text>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <CheckIcon
                    fontSize={"sm"}
                    color={"green.300"}
                    margin={"0 5px"}
                  />
                  <Box
                    display={"flex"}
                    flexDir={"column"}
                    alignItems={"center"}
                  >
                    <Text fontSize={"2rem"} color={"white"} fontWeight={"bold"}>
                      ${price}
                    </Text>
                    <Text color={"gray.300"} fontSize={"12px"}>
                      Sale
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Button
                width="100%"
                color="white"
                as={NavLink}
                state={{ price, strike_price, id }}
                colorScheme="whatsapp"
                to={"../edit-course"}
              >
                Adjust price
              </Button>
            </Box>
          ))
        )}
      </Flex>
    </Box>
  );
};
export default ManageCourses;
