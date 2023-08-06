import { Box, Heading, SimpleGrid, Image } from "@chakra-ui/react";
import image_1 from "../assets/images/image_1.jpg";
import image_2 from "../assets/images/image_2.jpg";
import image_3 from "../assets/images/image_3.jpg";
import image_4 from "../assets/images/image_4.jpg";
import image_5 from "../assets/images/image_5.jpg";
import image_6 from "../assets/images/image_6.jpg";
import image_7 from "../assets/images/image_7.jpg";
import image_8 from "../assets/images/image_8.jpg";
import image_9 from "../assets/images/image_9.jpg";
const TestimonialsSlider = () => {
  const photos = [
    image_1,
    image_2,
    image_3,
    image_4,
    image_5,
    image_5,
    image_6,
    image_7,
    image_8,
    image_9,
  ];

  const PhotoGallery = () => {
    return (
      <SimpleGrid columns={[1, 2, 3]} spacing="4">
        {photos.map((photo, index) => (
          <Box key={index}>
            <Image src={photo} alt={`Photo ${index + 1}`} />
          </Box>
        ))}
      </SimpleGrid>
    );
  };
  return (
    <Box maxW="800px" mx="auto" px="4">
      <Heading as="h3" color={"white"} textAlign="center" mb="6">
        What Our Customers Say
      </Heading>
      <PhotoGallery />
    </Box>
  );
};

export default TestimonialsSlider;
