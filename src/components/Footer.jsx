import React, { useRef } from "react";
import { Box, Flex, Button, Icon, Text, IconButton } from "@chakra-ui/react";
import {
  FaInstagram,
  FaEnvelope,
  FaFacebook,
  FaYoutube,
  FaDiscord,
} from "react-icons/fa";
const Footer = () => {
  return (
    <Box
      as="footer"
      bg="gray.800"
      color="white"
      py={12}
      px={{ base: 4, md: 12 }}>
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "flex-start" }}
        justify={{ base: "center", md: "space-between" }}
        maxW={{ base: "full", md: "1200px" }}
        mx="auto"
        px={{ base: 4, md: 0 }}>
        <Box mb={{ base: 8, md: 0 }}>
          <Text fontWeight="bold" fontSize="xl" letterSpacing="tight">
            Forex Mentorship
          </Text>
          <Text mt={2} fontSize="md" color="gray.400">
            Learn to trade Forex from the experts
          </Text>
        </Box>
        <Box>
          <Text
            as="h1"
            mb="5px"
            fontSize="2xl"
            textAlign={{ base: "center", md: "left" }}
            color="white">
            Contact Us
          </Text>
          <Flex
            direction={{ base: "column", md: "row" }}
            // align={{ base: "center", md: "flex-start" }}
            justify={{ base: "center", md: "flex-end" }}
            gap="10px"
            wrap={"wrap"}
            mt={{ base: 8, md: 0 }}>
            <IconButton
              as="a"
              href="https://www.facebook.com/"
              aria-label="Facebook"
              icon={<Icon as={FaFacebook} />}
              variant="solid"
              colorScheme="facebook"
              size="md"
            />
            <IconButton
              as="a"
              href="https://www.facebook.com/"
              aria-label="facebook"
              icon={<Icon as={FaInstagram} />}
              variant="solid"
              colorScheme="pink"
              size="md"
            />
            <IconButton
              as="a"
              href="https://www.facebook.com/"
              aria-label="youtube"
              icon={<Icon as={FaYoutube} />}
              variant="solid"
              colorScheme="red"
              size="md"
            />
            <IconButton
              as="a"
              href="https://www.facebook.com/"
              aria-label="youtube"
              icon={<Icon as={FaDiscord} />}
              variant="solid"
              colorScheme="blue"
              size="md"
            />
            <IconButton
              as="a"
              href="https://www.facebook.com/"
              aria-label="mail"
              icon={<Icon as={FaEnvelope} />}
              variant="solid"
              colorScheme="teal"
              size="md"
            />
          </Flex>
        </Box>
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
