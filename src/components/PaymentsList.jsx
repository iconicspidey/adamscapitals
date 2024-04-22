import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  GridItem,
  Heading,
  Flex,
  useToast,
} from "@chakra-ui/react";

import { FaBitcoin } from "react-icons/fa";
import { ArrowDownIcon } from "@chakra-ui/icons";
import moment from "moment";
import { useQuery } from "react-query";
import axiosFetch from "../configs/axiosConfig";
const PaymentList = (props) => {
  const {
    time,
    title,
    description,
    prepaidId,
    userId,
    discord_url,
    whatsapp_url,
    price,
    plan,
    refetch,
    id,
  } = props;
  const toast = useToast();
  const [isWithinHour, setIsWithinHour] = useState(true);
  const toastStates = {
    loading: {
      id: "loading",
      title: "Loading",
      description: "Please wait while we validate your payment...",
      status: "info",
      duration: 3000, // Duration in milliseconds
      isClosable: false, // Whether the toast can be closed by the user
    },
    success: {
      id: "success",
      title: "Success",
      description: "Payment validated successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    },
    error: {
      id: "error",
      title: "Error",
      description: "Failed to validate payment. Please try again.",
      status: "error",
      duration: 5000,
      isClosable: true,
    },
  };

  async function comfirmPayment() {
    const body = {
      plan,
      price,
      discord_url,
      whatsapp_url,
      id,
      userId,
      prepaidId,
    };
    toast(toastStates.loading);
    try {
      const response = await axiosFetch().post("/verify-crypto", body);
      const { status } = response.data;

      if (status === "INITIAL") {
        toast({
          title: "Transaction Initiated",
          description: "The transaction has been initiated.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      } else if (status === "PENDING") {
        toast({
          title: "Transaction Pending",
          description: "The transaction is pending for payment.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      } else if (status === "PAID") {
        toast({
          title: "Transaction Completed",
          description: "The transaction has been paid.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else if (status === "CANCELED") {
        toast({
          title: "Transaction Canceled",
          description: "The transaction has been closed by you.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      } else if (status === "ERROR") {
        toast({
          title: "Transaction Error",
          description: "An error occurred during the transaction.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else if (status === "REFUNDING" || status === "REFUNDED") {
        toast({
          title: "Refund Process",
          description: "The transaction is under a refund process.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      } else if (status === "EXPIRED") {
        toast({
          title: "Transaction Expired",
          description: "The transaction is expired.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Unknown Status",
          description: "Unrecognized status.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      refetch();
    } catch (error) {
      toast(toastStates.error);
    }
  }
  useEffect(() => {
    const currentTime = moment();
    const timeDiff = moment.duration(currentTime.diff(time)).asHours();

    setIsWithinHour(timeDiff < 1);
  }, []);
  return (
    <>
      {!isWithinHour ? (
        <GridItem
          key={prepaidId}
          py="6"
          px="4"
          borderWidth="1px"
          borderRadius="lg">
          <Flex flexDir={"column"} gap={2}>
            <Heading color="white" fontSize="lg">
              {title}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              {description}
            </Text>

            <Text fontSize="sm" color="white">
              Payment Initiated: {time}
            </Text>
            <Button onClick={() => comfirmPayment()} leftIcon={<FaBitcoin />}>
              Comfirm payment
            </Button>
          </Flex>
        </GridItem>
      ) : null}
    </>
  );
};

export default PaymentList;
