import React, { useState, useEffect } from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { stopSale } from "../redux-slice/flashSaleslice";
import { motion } from "framer-motion";
import DiscountCode from "./Discount";
const FlashSale = ({ discountPercentage }) => {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const now = new Date();
    const endTime = new Date(new Date(2024, 4, 5, 23, 56, 0)); // Set end time to next Monday at midnight
    const difference = endTime - now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      dispatch(stopSale(""));
    }

    return timeLeft;
  }

  return (
    <Box p="4" borderWidth="1px" borderRadius="md" boxShadow="md" my={"15px"}>
      {/* <Marquee direction="right" pauseOnHover> */}

      <Heading as="h3" size="md" color={"white"} mb="2">
        Discount Delight!
      </Heading>
      <Text mb="4" color={"white"}>
        {/* <span>Hurry up! There's a special discount for a limited time </span> */}
        <span>Hurry up! 60% off for the next </span>
        <span style={{ fontSize: "20px" }}>
          {timeLeft.days > 0 ? `${timeLeft.days}d ` : ""}
          {timeLeft.hours > 0 ? `${timeLeft.hours}h ` : ""}
          {timeLeft.minutes > 0 ? `${timeLeft.minutes}m ` : ""}
          {timeLeft.seconds > 0 ? `${timeLeft.seconds}s ` : ""}left!
        </span>
      </Text>
      {/* </Marquee> */}
      <DiscountCode />
    </Box>
  );
};

export default FlashSale;
