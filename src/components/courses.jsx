import {
  Box,
  Grid,
  Heading,
  IconButton,
  Text,
  Spinner,
  Button,
  Flex,
} from "@chakra-ui/react";
import { FaDiscord, FaUserCheck, FaWhatsapp } from "react-icons/fa";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import axiosFetch from "./../configs/axiosConfig";
import { useNavigate } from "react-router-dom";
import PaymentList from "./PaymentsList";
import moment from "moment";
import useFetchStudenBook from "../utils/studentbook";
import DownloadEbook from "./extra/DownloadEbook";

function Courses() {
  const navigate = useNavigate();
  const { user_id } = useSelector((state) => state.user);
  const { data, status, isLoading, error } = useQuery("courses", async () => {
    const response = await axiosFetch().get(`/student-course/${user_id}`);
    const { data } = response;
    return data;
  });

  const { data: studenteBook, isLoading: bookLoading } =
    useFetchStudenBook(user_id);
  const timestamp = (timestamp) => {
    const timeAgo = moment(timestamp).fromNow();
    return `${timeAgo}`;
  };
  const cryptoPayments = async () => {
    try {
      const response = await axiosFetch().get(`/crypto-payments/${user_id}`);
      return response.data; // Return data in case of success
    } catch (error) {
      throw error.response;
    }
  };
  const {
    data: cryptoData,
    isError: cryptoIsErr,
    error: cryptoErr,
    isLoading: cryptoIsloadin,
    isSuccess,
    refetch,
  } = useQuery("crypopayments", cryptoPayments);

  return (
    <Box>
      <Heading
        color="white"
        as="h1"
        fontSize="2rem"
        textAlign="center"
        py="10px"
      >
        Plan
      </Heading>
      <Box>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 30%)" }}
          gap={6}
        >
          {status == "success" && data.length
            ? data.map((plan) => (
                <Box
                  key={plan.course_id}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  p={6}
                  bg="gray.900"
                >
                  <Heading
                    as="h1"
                    textTransform={"capitalize"}
                    mb={4}
                    color="white"
                    fontSize="xl"
                  >
                    ADAMCAPITALS FX MENTORSHIP
                  </Heading>
                  <Text color="white" mb={4}>
                    PRO COMMUNITY LIFFETIME
                    <FaUserCheck
                      color="lightgreen"
                      size={"50px"}
                      display={"inline-block"}
                    />
                  </Text>
                  <Text my={"10px"} color="white">
                    Click below to Join
                  </Text>
                  <Flex flexDir={"column"} gap={2}>
                    <a
                      href={`${plan.discord_link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconButton
                        width={"100%"}
                        size={"md"}
                        aria-label="discord"
                        icon={<FaDiscord />}
                      />
                    </a>
                    {plan.whatsapp_link && (
                      <a
                        href={`${plan.discord_link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconButton
                          width={"100%"}
                          size={"md"}
                          aria-label="discord"
                          icon={<FaWhatsapp />}
                        />
                      </a>
                    )}
                  </Flex>
                </Box>
              ))
            : null}
        </Grid>
        {isLoading ? (
          <Spinner display={"block"} m={"auto"} color="blue.500" size="xl" />
        ) : null}
        {status == "success" && !data.length ? (
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 30%)" }}
          >
            <Box borderWidth="1px" borderRadius="lg" py="6" px="4">
              <Text textAlign="center" my={"10px"} color="white">
                YOU HAVE NOT YET JOIN
              </Text>
              <Button
                colorScheme="whatsapp"
                width="100%"
                onClick={() => navigate("/")}
              >
                JOIN NOW!
              </Button>
            </Box>
          </Grid>
        ) : null}
        <Flex align="center" justify="center" direction="column" p={5}>
          <Text py={2} color={"white"} fontSize={20} fontWeight={"bold"}>
            Your eBook is ready!
          </Text>
          {!bookLoading ? (
            studenteBook.map(() => <DownloadEbook />)
          ) : (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          )}
        </Flex>
        <Text textAlign={"center"} fontSize={"xl"} my={"20px"} color={"white"}>
          Initiated Payment and Verification
        </Text>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 48%)",
            lg: "repeat(3, 32.90%)",
          }}
          gap={2}
          overflow="hidden"
        >
          {isSuccess
            ? cryptoData.map((card) => (
                <PaymentList
                  title="Verify Binance Payment"
                  description="Please click the button below to confirm payment"
                  time={timestamp(card.createdAt)}
                  prepaidId={card.prepaid_id}
                  key={card.prepaid_id}
                  userId={346}
                  id={card.id}
                  whatsapp_url={card.whatsapp_url}
                  discord_url={card.discord_url}
                  price={card.price}
                  plan={card.plan}
                  refetch={refetch}
                />
              ))
            : null}
        </Grid>
        {isSuccess ? (
          cryptoData.length ? null : (
            <Text textAlign={"center"} color={"whiteAlpha.400"}>
              You have not initiated any Binance transaction.
            </Text>
          )
        ) : null}

        {cryptoIsloadin ? (
          <Spinner display={"block"} m={"auto"} color="blue.500" size="xl" />
        ) : null}
      </Box>
    </Box>
  );
}

export default Courses;
