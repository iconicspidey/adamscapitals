import {
  Box,
  Grid,
  Heading,
  IconButton,
  Text,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { FaDiscord, FaUserCheck } from "react-icons/fa";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import axiosFetch from "./../configs/axiosConfig";
import { useNavigate } from "react-router-dom";

function Courses() {
  const navigate = useNavigate();
  const { user_id } = useSelector((state) => state.user);
  const { data, status, isLoading, error } = useQuery("courses", async () => {
    const response = await axiosFetch().get(`/student-course/${user_id}`);
    const { data } = response;
    return data;
  });
  return (
    <Box>
      <Heading
        color="white"
        as="h1"
        fontSize="2rem"
        textAlign="center"
        py="10px">
        Plan
      </Heading>
      <Box>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          width={"100%"}
          gap={6}>
          {status == "success" && data.length
            ? data.map((plan) => (
                <Box
                  key={plan.course_id}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  p={6}
                  bg="gray.900">
                  <Heading
                    as="h1"
                    textTransform={"capitalize"}
                    mb={4}
                    color="white"
                    fontSize="xl">
                    ADAMCAPITALS FX MENTORSHIP
                  </Heading>
                  <Text color="white" mb={4}>
                    PRO COMMUNITY LIFFETIME{" "}
                    <FaUserCheck
                      color="lightgreen"
                      size={"50px"}
                      display={"inline-block"}
                    />
                  </Text>
                  <Text my={"10px"} color="white">
                    Click below to Join
                  </Text>

                  <a
                    href={`${plan.discord_link}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    <IconButton
                      width={"100%"}
                      size={"md"}
                      aria-label="discord"
                      icon={<FaDiscord />}
                    />
                  </a>
                </Box>
              ))
            : null}
        </Grid>
        {isLoading ? (
          <Spinner display={"block"} m={"auto"} color="blue.500" size="xl" />
        ) : null}
        {status == "success" && !data.length ? (
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            width={"100%"}>
            <Text textAlign="center" m={"auto"} color="white">
              YOU HAVE NOT YET JOIN
              <Button
                colorScheme="whatsapp"
                width="100%"
                onClick={() => navigate("/")}>
                JOIN NOW!
              </Button>
            </Text>
          </Grid>
        ) : null}
      </Box>
    </Box>
  );
}

export default Courses;
