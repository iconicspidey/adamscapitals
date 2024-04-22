import React from "react";
import { Box, Text, Center, IconButton, Heading } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { FaUserCircle } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    name: "KIRU",
    message:
      "Adamcapitals YOU ARE THE MAN ,always giving sniper entries ,what I love about your signals is minimal sl and large tp always targeting 100pips  plus",
  },
  {
    id: 2,
    name: "Imann",
    message:
      "As a beginner in forex trading, this platform's educational resources and user-friendly interface have made the learning curve much smoother. I'm gaining confidence and profits!",
  },
  {
    id: 3,
    name: "MSK",
    message:
      "adamcapitals first day in your discord and I got 600$ profit Alhamdulilah keep it going brother",
  },
  {
    id: 4,
    name: "Luka Brazi",
    message:
      "I've tried multiple forex platforms, but the customer support I got at adamcaptials is exceptional. They guided me through setting up my trades and provided valuable market analysis. thank you soo much Adamcapitals",
  },
  {
    id: 5,
    name: "Captain",
    message:
      "The accuracy of their trading signals is astonishing! My portfolio has seen consistent growth since I started following their recommendations.",
  },
  // Add more testimonials here
];

const ArrowButton = ({ direction, onClick, position, right, left }) => {
  const icon =
    direction === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />;
  return (
    <IconButton
      aria-label={`Arrow right`}
      icon={icon}
      size="lg"
      color={"gray.500"}
      backgroundColor={"transparent"}
      border={"1px solid #fff"}
      position={position}
      top="50%" // Vertically center the button
      transform="translateY(50%)"
      zIndex={10000}
      left={left}
      right={right}
      onClick={onClick}
      _hover={{ backgroundColor: "gray.700" }}
      display={{ base: "none", lg: "block" }}
    />
  );
};
const TestimonialsSlider = () => {
  const settings = {
    dots: true, // Apply custom class to dots
    arraws: true,
    prevArrow: <ArrowButton direction="left" position="absolute" left="10px" />,
    nextArrow: (
      <ArrowButton direction="right" position="absolute" right="10px" />
    ),
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Box overflow={"hidden"} position={"relative"} py={8}>
      <Heading color="gray.100" textAlign={"center"}>
        Members Reviews
      </Heading>
      <Slider {...settings}>
        {testimonials.map((testimony) => (
          <Box key={testimony.id} p={6}>
            <Center flexDirection="column" p={5} textAlign="center">
              <IconButton
                size={"lg"}
                backgroundColor={"gray.900"}
                color={"gray.100"}
                borderRadius={"2xl"}
                colorScheme="blue"
                icon={<FaUserCircle />}
              />
              <Text color="gray.100" fontSize="lg" fontWeight="bold" mb={2}>
                {testimony.name}
              </Text>
              <Text color="gray.100">{testimony.message}</Text>
            </Center>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default TestimonialsSlider;
