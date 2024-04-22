import React from "react";
import { Text } from "@chakra-ui/react";

const CurrencyFormatComponent = ({ value }) => {
  const formattedCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD", // Change this to the desired currency code
  }).format(value);

  return <Text display={"inline"}>{formattedCurrency}</Text>;
};

export default CurrencyFormatComponent;
