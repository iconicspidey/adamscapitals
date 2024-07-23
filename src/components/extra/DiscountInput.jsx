import React, { useState } from "react";
import {
  Input,
  FormControl,
  FormErrorMessage,
  FormErrorIcon,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import axiosFetch from "../../configs/axiosConfig";
import { applyCouponCode } from "../../redux-slice/coursesSlice";
import { useDispatch, useSelector } from "react-redux";

function DiscountInput({ type, id }) {
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState("");
  const [error, setError] = useState({});
  async function applyCoupon(event) {
    event.preventDefault();

    try {
      const response = await axiosFetch().post("/discount", { coupon, type });
      const { discount } = response.data;
      dispatch(applyCouponCode({ id, discount }));
      setError({ status: true });
      setCoupon("");
    } catch (error) {
      const { data, status } = error.response;
      if (status) {
        setError(data);
      } else {
        setError({ message: "something went worong" });
      }
    }
  }
  return (
    <form onSubmit={applyCoupon} action="">
      <FormControl isInvalid={error?.message}>
        <Flex gap={"10px"} mt={"10px"}>
          <Input
            placeholder="Discount code"
            value={coupon}
            onChange={(event) => setCoupon(event.target.value)}
            width={"75%"}
            errorBorderColor="green"
          />
          <Button width={"25%"} type="submit" colorScheme="whatsapp">
            Apply
          </Button>
        </Flex>
        {error?.status ? <Text color="green.400">success</Text> : null}
        <FormErrorMessage flex={"flex"} alignItems={"center"}>
          <FormErrorIcon />
          <FormErrorMessage>{error?.message}</FormErrorMessage>
        </FormErrorMessage>
      </FormControl>
    </form>
  );
}

export default DiscountInput;
