import React, { useState } from "react";
import { Box, Input, Button, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { discount } from "../redux-slice/priceSlice";
import { useNavigate } from "react-router-dom";

const DiscountCode = ({ applyDiscount }) => {
  const [discountCode, setDiscountCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState({ status: false, message: "" });
  const { logged } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (event) => {
    setDiscountCode(event.target.value);
  };

  const handleApplyDiscount = () => {
    if (!logged) {
      navigate("/account/login");
    }
    if (discountCode === "FLASH5") {
      dispatch(discount());
      setError(""); // Clear any previous error message
      setSuccess((prev) => {
        return { status: true, message: "Discount applied successfully!" };
      });
    } else {
      setError("Invalid discount code. Please try again."); // Display error message
    }
  };

  return (
    <Box>
      {!success.status ? (
        <Input
          placeholder="Enter discount code"
          value={discountCode}
          onChange={handleChange}
          mb={2}
          color={"white"}
        />
      ) : null}
      {error && (
        <Text color="red.500" mb={2}>
          {error}
        </Text>
      )}
      {success.status && (
        <Text color="green.500" mb={2}>
          {success.message}
        </Text>
      )}
      {!success.status ? (
        <Button colorScheme="whatsapp" onClick={handleApplyDiscount}>
          Apply Discount
        </Button>
      ) : null}
    </Box>
  );
};

export default DiscountCode;
