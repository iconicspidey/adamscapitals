import { useState } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TestimonialsSlider = () => {
  const testimonials = [
    {
      name: "John Doe",
      title: "Forex Trader",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultrices tortor a dolor vulputate, et egestas augue viverra. Sed et lorem vel turpis mattis consequat.",
    },
    {
      name: "Jane Smith",
      title: "Investor",
      text: "Nullam pellentesque felis sit amet lectus lobortis, in suscipit mauris tristique. In egestas libero vitae arcu iaculis maximus. Quisque quis massa ipsum. Vivamus nec risus et risus tristique ultrices ac eu erat.",
    },
    {
      name: "Bob Johnson",
      title: "Stock Trader",
      text: "Phasellus euismod facilisis sem a ullamcorper. Sed volutpat nisl eu turpis pretium, in feugiat mi faucibus. Nullam eu ultricies sapien. Aliquam at sapien nunc. ",
    },
  ];

  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  const handlePreviousClick = () => {
    setActiveTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setActiveTestimonialIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const activeTestimonial = testimonials[activeTestimonialIndex];

  return (
    <Box maxW="600px" mx="auto" px="4">
      <Heading as="h2" color={"white"} textAlign="center" mb="6">
        What Our Customers Say
      </Heading>
      <Flex
        justify="space-between"
        align="center"
        borderWidth="1px"
        borderRadius="md"
        p="6"
      >
        <Box flex="1">
          <Text fontSize="xl" color={"white"} fontWeight="bold" mb="2">
            {activeTestimonial.name}
          </Text>
          <Text fontSize="lg" color={"white"} fontWeight="semibold" mb="2">
            {activeTestimonial.title}
          </Text>
          <Text color={"white"} fontSize="md">{activeTestimonial.text}</Text>
        </Box>
        <Flex align="center">
          <Box
            as={FaChevronLeft}
            size="30px"
            cursor="pointer"
            onClick={handlePreviousClick}
            mr="2"
            bg={"whiteAlpha.300"}
          />
          <Box
            as={FaChevronRight}
            size="30px"
            cursor="pointer"
            onClick={handleNextClick}
            bg={"whiteAlpha.300"}

          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default TestimonialsSlider;
