import React,{useState} from "react";
import {
   Box, 
  Button, 
  Flex, 
  Heading,
   Text } from "@chakra-ui/react";
import hero from "../assets/hero.jpg"
import MentorshipCard from "../components/MentorshipCard";
import TestimonialsSlider from '../components/TestimonialsSlider';

const Home = () => {
   
  return (
    <div>
    <Box
      bgImage={`url(${hero})`}
      bgPosition="center"
      bgSize="cover"
      h={{ base: "400px", md: "500px", lg: "600px" }}
      px={{ base: 4, lg: 20 }}
      py={{ base: 12, lg: 20 }}
    >
      <Flex
        direction={{ base: "column", lg: "row" }}
        justify={{ base: "center", lg: "space-between" }}
        align={{ base: "center", lg: "flex-start" }}
        maxW={{ base: "full", lg: "1200px" }}
        mx="auto"
        >
        <Box
          flex="1"
          textAlign={{ base: "center", lg: "left" }}
          mb={{ base: 8, lg: 0 }}
        >
          <Heading
            as="h1"
            fontSize={{ base: "3xl", lg: "5xl" }}
            fontWeight="bold"
            color="white"
            mb={4}
            lineHeight="shorter"
            >
            Learn to Trade Forex
          </Heading>
          <Text fontSize={{ base: "md", lg: "xl" }} color="white" mb={8}>
            Get expert mentorship and learn to trade the foreign exchange market like a pro.
          </Text>
          <Button color="white" bg="green.500" size="lg" rounded="full">
            Get Started
          </Button>
        </Box>
        <Box flex="1">
          {/* Add an image here */}
        </Box>
      </Flex>
    </Box>
    {/*  */}
    <Box bg="gray.800" py={16}>
      <Box
        maxW={{ base: "90%", md: "80%", lg: "70%", xl: "1200px" }}
        mx="auto"
        >
           <MentorshipCard />
      </Box>
      <TestimonialsSlider  />
    </Box>
    {/*  */}

   </div>
  );
};

export default Home;
