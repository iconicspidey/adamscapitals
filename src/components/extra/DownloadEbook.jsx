import { Box, Button, Text, Image } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";
import React from "react";
import ebookImg from "../../assets/e-book.png";
import axiosFetch from "../../configs/axiosConfig";
import { useNavigate } from "react-router-dom";

function DownloadEbook() {
  const navigate = useNavigate();
  const downloadBook = async () => {
    try {
      const response = await axiosFetch().get("/download");
      const url = `${response.config.baseURL}/download`;
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };
  return (
    <Box
      maxWidth={"280px"}
      borderWidth=".5px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      boxShadow="lg"
      display="flex"
      flexDir={"column"}
      alignItems={"center"}
    >
      <Image
        src={ebookImg}
        borderRadius="md"
        objectFit="fill"
        boxSize="100%"
        height={"260px"}
      />
      <Text color={"white"} mb={2}>
        Click below to download
      </Text>
      <Button
        leftIcon={<ArrowDownIcon />}
        colorScheme="whatsapp"
        variant="solid"
        width={"100%"}
        onClick={downloadBook}
      >
        Download
      </Button>
    </Box>
  );
}

export default DownloadEbook;
