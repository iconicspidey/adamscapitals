import {
  Box,
  Grid,
  Heading,
  IconButton,
  Link,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import axiosFetch from "./../configs/axiosConfig";

function Courses() {
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
        Plans
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
                    {plan.plan}
                  </Heading>
                  <Text color="white" mb={4}>
                    {plan.description}
                  </Text>
                  <Text color="white" mb={4}>
                    {plan.price}
                  </Text>
                  <Link
                    display={"flex"}
                    gap="7"
                    alignItems={"center"}
                    href={`${plan.discord_link}`}
                    isExternal>
                    <IconButton aria-label="discord" icon={<FaDiscord />} />
                    <Text color="white">Click to Join</Text>
                  </Link>
                  <Link isExternal></Link>
                </Box>
              ))
            : null}
        </Grid>
        {isLoading ? (
          <Spinner display={"block"} m={"auto"} color="blue.500" size="xl" />
        ) : null}
        {status == "success" && !data.length ? (
          <Text textAlign="center" m={"auto"} color="white">
            You have no plan
          </Text>
        ) : null}
      </Box>
    </Box>
  );
}

export default Courses;
