import {
  Box,
  Button,
  Heading,
  Text,
  useBreakpointValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
} from "@chakra-ui/react";
import { CheckIcon, ChevronDownIcon, WarningTwoIcon } from "@chakra-ui/icons";
import axiosFetch from "../configs/axiosConfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaBitcoin, FaCreditCard, FaPlus, FaMinus } from "react-icons/fa";
import { useState } from "react";
import CurrencyFormatComponent from "./currencyFormat";
import CryptoModal from "./CryptoModal";
import FlashSale from "./FlashSale";
import DiscountInput from "./extra/DiscountInput";

const MentorshipCard = () => {
  const { role, user_id, email, logged } = useSelector((state) => state.user);
  const { status } = useSelector((state) => state.sale);
  const data = useSelector((state) => state.courses);
  const [toOneMentorship] = data.filter(({ type }) => type == "one-to-one");
  const [toManyMentorship] = data.filter(({ type }) => type == "one-to-many");
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });
  const makepayment = async (amount, whatsapp = null) => {
    if (!logged) return navigate("/account");
    if (role !== "student") return navigate("/admin");

    try {
      // Make a request to your backend endpoint that handles Paystack payment initiation
      const response = await axiosFetch().post("/paystack", {
        amount: amount * quantity, // Payment amount
        email: email,
        user_id: user_id,
        whatsapp: whatsapp,
        plan: quantity,
      });

      const { authorization_url, reference } = response.data;
      // Redirect the user to the Paystack payment page
      window.location.href = authorization_url;
    } catch (error) {
      console.error("Error initiating payment:", error.response);
      // Handle error
    }
  };
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  return (
    <Box py={20}>
      <Heading as="h2" color="white" textAlign="center" mb={10}>
        What We Offer
      </Heading>
      {status ? (
        <FlashSale
          endTime={new Date("2024-05-01T00:00:00")}
          discountPercentage={30}
        />
      ) : null}
      <Flex
        justify="center"
        flexWrap={isLargeScreen ? "nowrap" : "wrap"}
        gap={isLargeScreen ? "10px" : "20px"}
      >
        <Box
          borderWidth="1px"
          borderRadius="lg"
          // overflow="hidden"
          p={6}
          flex={isLargeScreen ? "1" : "0 0 calc(100% - 20px)"}
          mb={isLargeScreen ? 0 : 10}
          bg="gray.900"
        >
          <Heading as="h3" mb={4} color="white" fontSize="xl">
            DISCORD MENTORSHIP
          </Heading>
          <Text fontSize={"lg"} color="white" mb={4}>
            <CheckIcon /> Smc full course
          </Text>
          <Text color="white" mb={4}>
            <CheckIcon /> Zoom calls
          </Text>
          <Text color="white" mb={4}>
            <CheckIcon /> Daily Setups and signals
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
          <Text color="white" mb={4}>
            <CheckIcon /> Short videos course
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
                    textAlign="left"
                  >
                    Course Curriculum
                  </Box>
                  <AccordionIcon
                    as={ChevronDownIcon}
                    color="white"
                    boxSize={6}
                  />
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
              alignItems={"center"}
            >
              <Text
                fontSize={"16px"}
                color="red.400"
                textDecoration={"line-through"}
                fontWeight={"bold"}
              >
                ${toManyMentorship.strike_price}
              </Text>
              <Text fontSize={"2rem"} fontWeight={"bold"}>
                <CheckIcon
                  fontSize={"sm"}
                  color={"green.300"}
                  margin={"0 5px"}
                />
                <CurrencyFormatComponent
                  value={toManyMentorship.price * quantity}
                />
              </Text>
            </Box>
            <Box>
              <Text color="white" textAlign={"center"}>
                Yearly Plan
              </Text>

              <Flex align="center" justifyContent={"center"}>
                <Button
                  size="sm"
                  onClick={handleDecrement}
                  colorScheme="whatsapp"
                  leftIcon={<FaMinus />}
                ></Button>
                <Text mx={2}>{quantity}</Text>
                <Button
                  colorScheme="whatsapp"
                  leftIcon={<FaPlus />}
                  size="sm"
                  onClick={handleIncrement}
                ></Button>
              </Flex>
              <DiscountInput
                type={toManyMentorship.type}
                id={toManyMentorship.id}
              />
            </Box>
          </Box>
          <Box
            py={"10px"}
            display="flex"
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{ base: "column", md: "row" }}
            gap={"10px"}
          >
            <Button
              width={"100%"}
              onClick={() => makepayment(toManyMentorship.price)}
              colorScheme="whatsapp"
              leftIcon={<FaCreditCard />}
            >
              Pay with Card
            </Button>
            <CryptoModal
              price={toManyMentorship.price * quantity}
              user_id={user_id}
              logged={logged}
              role={role}
            />
          </Box>
        </Box>
        {/*  */}
        <Box
          borderWidth="1px"
          borderRadius="lg"
          // overflow="hidden"
          p={6}
          flex={isLargeScreen ? "1" : "0 0 calc(100% - 20px)"}
          mb={isLargeScreen ? 0 : 10}
          bg="gray.900"
        >
          <Heading as="h3" mb={4} color="white" fontSize="xl">
            DISCORD MENTORSHIP + One To One
          </Heading>
          <Text fontSize={"lg"} color="white" mb={4}>
            <CheckIcon /> Smc full course
          </Text>
          <Text color="white" mb={4}>
            <CheckIcon /> One to One zoom calls(1-2)Hours in a Week for 1 month
          </Text>
          <Text color="white" mb={4}>
            <CheckIcon /> Zoom calls
          </Text>
          <Text color="white" mb={4}>
            <CheckIcon /> Daily Setups and signals
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
          <Text color="white" mb={4}>
            <CheckIcon /> Short videos course
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
                    textAlign="left"
                  >
                    Course Curriculum
                  </Box>
                  <AccordionIcon
                    as={ChevronDownIcon}
                    color="white"
                    boxSize={6}
                  />
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
              alignItems={"center"}
            >
              <Text
                fontSize={"16px"}
                color="red.400"
                textDecoration={"line-through"}
                fontWeight={"bold"}
              >
                ${toOneMentorship.strike_price}
              </Text>
              <Text fontSize={"2rem"} fontWeight={"bold"}>
                <CheckIcon
                  fontSize={"sm"}
                  color={"green.300"}
                  margin={"0 5px"}
                />
                <CurrencyFormatComponent
                  value={toOneMentorship.price * quantity}
                />
              </Text>
            </Box>
            <Box>
              <Text color="white" textAlign={"center"}>
                Yearly Plan
              </Text>

              <Flex align="center" justifyContent={"center"}>
                <Button
                  size="sm"
                  onClick={handleDecrement}
                  colorScheme="whatsapp"
                  leftIcon={<FaMinus />}
                ></Button>
                <Text mx={2}>{quantity}</Text>
                <Button
                  colorScheme="whatsapp"
                  leftIcon={<FaPlus />}
                  size="sm"
                  onClick={handleIncrement}
                ></Button>
              </Flex>
              <DiscountInput
                id={toOneMentorship.id}
                type={toOneMentorship.price}
              />
            </Box>
          </Box>
          <Box
            py={"10px"}
            display="flex"
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{ base: "column-reverse", md: "row-reverse" }}
            gap={"10px"}
          >
            <CryptoModal
              price={toOneMentorship.price * quantity}
              whatsapp="https://wa.me/+2348102609099"
              user_id={user_id}
              logged={logged}
              role={role}
            />
            <Button
              width={"100%"}
              onClick={() =>
                makepayment(
                  toOneMentorship.price * quantity,
                  "https://wa.me/+2348102609099"
                )
              }
              colorScheme="whatsapp"
              leftIcon={<FaCreditCard />}
            >
              Pay with Card
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default MentorshipCard;
