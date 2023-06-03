import {
  Box,
  Button,
  Heading,
  Text,
  useBreakpointValue,
  ButtonGroup,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";
import axiosFetch from "../configs/axiosConfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MentorshipCard = () => {
  const { role, user_id, email, logged } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const isLargeScreen = useBreakpointValue({ base: false, lg: true });

  const makepayment = async (price) => {
    try {
      // Make a request to your backend endpoint that handles Paystack payment initiation
      const response = await axiosFetch().post("/paystack", {
        amount: price * 100, // Payment amount
        email: email,
        user_id: user_id,
      });

      const { authorization_url, reference } = response.data;
      // Redirect the user to the Paystack payment page
      window.location.href = authorization_url;
    } catch (error) {
      console.error("Error initiating payment:", error.response);
      // Handle error
    }
  };

  return (
    <Box py={20}>
      <Heading as="h2" color="white" textAlign="center" mb={10}>
        What We Offer
      </Heading>
      {/* <Flex
        justify="center"
        flexWrap={isLargeScreen ? "nowrap" : "wrap"}
        gap={isLargeScreen ? "6px" : "20px"}
        mx={{ base: "auto", lg: 0 }}
        maxW={{ base: "80vw", lg: "1200px" }}> */}
      <Box
        borderWidth="1px"
        borderRadius="lg"
        // overflow="hidden"
        p={6}
        flex={isLargeScreen ? "1" : "0 0 calc(100% - 20px)"}
        mb={isLargeScreen ? 0 : 10}
        bg="gray.900">
        <Heading as="h3" mb={4} color="white" fontSize="xl">
          PRO COMMUNITY LIFFETIME
        </Heading>
        <Text fontSize={"lg"} color="white" mb={4}>
          <CheckIcon /> Smc full course
        </Text>
        <Text color="white" mb={4}>
          <CheckIcon /> Weekly setups and signals
        </Text>
        <Text color="white" mb={4}>
          <CheckIcon /> Daily Setups and signals
        </Text>
        <Text color="white" mb={4}>
          <CheckIcon /> Live lessons trading
        </Text>
        <Text color="white" mb={4}>
          <CheckIcon /> Support with me 24/7
        </Text>
        <Text color="white" mb={4}>
          <CheckIcon /> Beginner friendly-no experience required
        </Text>
        <Text color="white" mb={4}>
          <CheckIcon /> Straight to the point contents
        </Text>
        <Accordion border={"none"} allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box
                  as="span"
                  fontSize={"1.2rem"}
                  textTransform={"uppercase"}
                  flex="1"
                  color="white"
                  textAlign="left">
                  Course Curriculum
                </Box>
                <AccordionIcon as={ChevronDownIcon} color="white" boxSize={6} />
                <ChevronDownIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel color="white">
              <Text color="white" mb={4}>
                <CheckIcon /> Market structure
              </Text>
              <Text color="white" mb={4}>
                <CheckIcon /> Supply & demand + liqidity
              </Text>
              <Text color="white" mb={4}>
                <CheckIcon /> Order blocks
              </Text>
              <Text color="white" mb={4}>
                <CheckIcon /> Market efficiency
              </Text>
              <Text color="white" mb={4}>
                <CheckIcon /> Understanding the price circle
              </Text>
              <Text color="white" mb={4}>
                <CheckIcon /> How to stack your trade
              </Text>
              <Text color="white" mb={4}>
                <CheckIcon /> Psychology
              </Text>
              <Text color="white" mb={4}>
                <CheckIcon /> Community Chats
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <Box color="white">
          <Box
            display={"flex"}
            justifyContent={"space-evenly"}
            alignItems={"center"}>
            <Text
              fontSize={"16px"}
              color="red.400"
              textDecoration={"line-through"}
              fontWeight={"bold"}>
              $100
            </Text>
            <Text fontSize={"2rem"} fontWeight={"bold"}>
              <CheckIcon fontSize={"sm"} color={"green.300"} /> $60
            </Text>
          </Box>
          <Text textAlign={"center"} size={"sm"}>
            One-time payment
          </Text>
        </Box>
        <ButtonGroup
          py={"10px"}
          display="flex"
          alignItems={"center"}
          justifyContent={"space-between"}>
          <Text color="white" mb={4}></Text>
          {!logged && (
            <Button
              width={"100%"}
              onClick={() => navigate("/account")}
              colorScheme="whatsapp">
              Buy
            </Button>
          )}
          {role === "student" && (
            <Button
              width={"100%"}
              onClick={() => makepayment(60)}
              colorScheme="whatsapp">
              Buy
            </Button>
          )}
          {role === "admin" && (
            <Button
              width={"100%"}
              onClick={() => navigate("/admin")}
              colorScheme="whatsapp">
              Buy
            </Button>
          )}
        </ButtonGroup>
      </Box>
      {/* </Flex> */}
    </Box>
  );
};

export default MentorshipCard;
