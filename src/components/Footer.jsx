import React from "react";
import { Box, Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="gray.800"
      color="white"
      py={12}
      px={{ base: 4, md: 12 }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "flex-start" }}
        justify={{ base: "center", md: "space-between" }}
        maxW={{ base: "full", md: "1200px" }}
        mx="auto"
        px={{ base: 4, md: 0 }}
      >
        <Box mb={{ base: 8, md: 0 }}>
          <Text fontWeight="bold" fontSize="xl" letterSpacing="tight">
            Forex Mentorship
          </Text>
          <Text mt={2} fontSize="md" color="gray.400">
            Learn to trade Forex from the experts
          </Text>
        </Box>
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "flex-start" }}
          justify={{ base: "center", md: "flex-end" }}
          mt={{ base: 8, md: 0 }}
        >
          <Link mr={8} href="#">
            About Us
          </Link>
          <Link mr={8} href="#">
            Contact
          </Link>
          <Link mr={8} href="#">
            Privacy Policy
          </Link>
          <Link href="#">Terms of Use</Link>
        </Flex>
      </Flex>
      <Box mt={8} textAlign={{ base: "center", md: "left" }}>
        <Text fontSize="sm" color="gray.400">
          © {new Date().getFullYear()} Forex Mentorship. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
