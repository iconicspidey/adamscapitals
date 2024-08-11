// src/components/eBookCard.js
import React, { useState } from "react";
import {
  Box,
  Image,
  Text,
  Stack,
  Button,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  Input,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axiosFetch from "../../configs/axiosConfig";
import { useSelector } from "react-redux";

const EbookCard = ({ title, photoUrl, price }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { pathname, key, search } = useLocation();
  const path = "/admin/manage-courses";
  const checkPage = pathname === path;
  const [bookPrice, setBookPrice] = useState(price);
  const { user_id, logged, email } = useSelector((state) => state.user);
  const postData = async (data) => {
    const response = await axiosFetch().patch("/book", data);
    return response.data;
  };
  const { data, isLoading, error, isError, mutate, isSuccess } = useMutation(
    postData,
    {
      onSuccess: (data) => {
        // Show success toast
        toast({
          title: "Data submitted successfully.",
          description: `${data.message}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      },
      onError: (error) => {
        // Show error toast
        toast({
          title: "Error submitting data.",
          description: `${error.response.data.message}`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      },
    }
  );
  const formSubmit = async (event) => {
    event.preventDefault();
    mutate({ price: bookPrice });
  };
  const initPayment = async ({ amount, email }) => {
    const response = await axiosFetch().post(`/ebookpayment/${user_id}`, {
      amount,
      email,
    });
    return response.data;
  };
  const {
    mutate: paymentMatuate,
    isLoading: paymentLoading,
    isSuccess: paymentIssucces,
    paymentData,
  } = useMutation(initPayment, {
    onSuccess: (data) => {
      // Assuming 'data' contains the URL to redirect the user to
      if (data && data.authorization_url) {
        // window.location.href = data.authorization_url;
      } else {
        toast({
          title: "Error",
          description: "No URL provided by the server.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Payment Failed",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  function paymentFunc() {
    if (!logged) return navigate("/account/login");
    paymentMatuate({ amount: price, email });
  }
  return (
    <Box
      maxWidth={"300px"}
      borderWidth=".5px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      boxShadow="lg"
    >
      <Image
        borderRadius="md"
        src={photoUrl}
        alt={title}
        objectFit="fill"
        boxSize="100%"
        height={"260px"}
      />
      <Stack spacing="2" mt="4">
        <Text fontSize="lg" color={"white"} fontWeight="bold">
          {title}
        </Text>
        <Text fontWeight={"bold"} color="white" fontSize={20}>
          Value: ${price}
        </Text>
        {checkPage ? (
          <form onSubmit={formSubmit}>
            <Text color={"white"} mb={2}>
              Adjust price below
            </Text>
            <FormControl isInvalid={isError}>
              <Flex gap={2}>
                <Input
                  type="text"
                  color={"white"}
                  placeholder="price"
                  value={bookPrice}
                  onChange={(e) => setBookPrice(e.target.value)}
                />
                <Button
                  type="submit"
                  state={price}
                  colorScheme="whatsapp"
                  variant="solid"
                >
                  Apply
                </Button>
              </Flex>
              <FormErrorMessage>
                <FormErrorIcon />
                {error?.response.data.message}
              </FormErrorMessage>
            </FormControl>
          </form>
        ) : (
          <Button
            onClick={paymentFunc}
            isLoading={paymentLoading}
            colorScheme="whatsapp"
            variant="solid"
          >
            Buy Now
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default EbookCard;
