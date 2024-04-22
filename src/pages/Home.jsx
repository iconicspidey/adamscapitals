import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  ButtonGroup,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowDownIcon } from "@chakra-ui/icons";
import logo from "../assets/logo.jpg";
import MentorshipCard from "../components/MentorshipCard";
import TestimonialsSlider from "../components/TestimonialsSlider";

const Home = () => {
  const scroll = () => {
    document.getElementById("start").scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <Box
        bgImage={`url(${logo})`}
        bgPosition="center"
        bgSize="cover"
        h={{ base: "400px", md: "500px", lg: "600px" }}>
        <Box
          backgroundColor="rgba(0,0,0,.7)"
          h={{ base: "400px", md: "500px", lg: "600px" }}
          px={{ base: 4, lg: 20 }}
          py={{ base: 12, lg: 20 }}>
          <Flex
            direction={{ base: "column", lg: "row" }}
            justify={{ base: "center", lg: "space-between" }}
            align={{ base: "center", lg: "flex-start" }}
            maxW={{ base: "full", lg: "1200px" }}
            mx="auto">
            <Box
              flex="1"
              textAlign={{ base: "center", lg: "left" }}
              mb={{ base: 8, lg: 0 }}>
              <Heading
                as="h1"
                fontSize={{ base: "3xl", lg: "5xl" }}
                fontWeight="bold"
                color="gray.100"
                mb={4}
                lineHeight="shorter">
                Learn to Trade 
              </Heading>
              <Text fontSize={{ base: "md", lg: "xl" }} color="gray.200" mb={8}>
                Get expert mentorship and learn to trade the foreign exchange
                market like a pro.
              </Text>
              <ButtonGroup>
                <Button
                  leftIcon={<ArrowDownIcon />}
                  color="white"
                  bg="green.500"
                  size="lg"
                  rounded="full"
                  onClick={scroll}>
                  Get Started
                </Button>
                <Button
                  color="white"
                  bg="red.500"
                  rightIcon={<ArrowForwardIcon />}
                  size="lg"
                  rounded="full">
                  <a
                    href="https://one.exness-track.com/a/1c4mv7jcf2?"
                    target="_blank"
                    rel="noopener noreferrer">
                    Broker
                  </a>
                </Button>
              </ButtonGroup>
            </Box>
            <Box flex="1"></Box>
          </Flex>
        </Box>
      </Box>
      {/*  */}
      <Box bg="gray.800" py={16}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          maxW={{ base: "90%", md: "80%", lg: "70%", xl: "1200px" }}
          mx="auto"
          id="start">
          <MentorshipCard />
        </Box>
        <TestimonialsSlider />
      </Box>
      {/*  */}
      <Box bg="gray.800" id="#about">
        <Box textAlign="center" maxW="800px" mx="auto" py={6}>
          <Heading as="h2" color="white" size="2xl" mb="4">
            About Us
          </Heading>
          <Text fontSize="xl" color="white" mt="4">
            Our forex trading mentorship platform offers personalized guidance
            and comprehensive programs to help individuals become successful
            traders. With experienced mentors, one-on-one coaching, educational
            resources, and a supportive trading community, we provide the
            necessary tools for traders to navigate the forex market with
            confidence. Our flexible packages cater to different experience
            levels and goals, with personalized trading plans and ongoing
            support. Join us today and embark on your journey towards financial
            freedom.
          </Text>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
