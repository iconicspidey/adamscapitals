// src/components/CouponCard.js
import { Box, Text, Flex, useBreakpointValue, Spinner } from "@chakra-ui/react";
import CouponCard from "./CouponCard";
import { useQuery } from "react-query";
import axiosFetch from "../../configs/axiosConfig";
const Coupon = ({ coupon }) => {
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });
  const fetch = async () => {
    const response = await axiosFetch().get("/coupon");
    return response.data;
  };
  const { data, isFetched, isError, error, isSuccess, refetch, isFetching } =
    useQuery("coupon", fetch);
  return (
    <Box
      maxW={{ base: "90%", md: "80%", lg: "70%", xl: "1200px" }}
      paddingX={["5px", "0px"]}
      gap={"10px"}
      margin={"20px auto"}
      flexWrap={"wrap"}
    >
      <Flex
        justify="center"
        flexWrap={"wrap"}
        gap={isLargeScreen ? "10px" : "10px"}
      >
        {isSuccess &&
          data.map(
            ({
              id,
              coupon_code,
              type,
              is_active,
              price,
              expiration_date,
              created_at,
            }) => (
              <CouponCard
                key={id}
                id={id}
                coupon={coupon_code}
                type={type}
                isActive={is_active}
                expireDate={expiration_date}
                timestamp={created_at}
                price={price}
                refetch={refetch}
              />
            )
          )}
      </Flex>
      {isFetching ? (
        <Box display={"flex"} justifyContent={"center"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            m={"auto"}
          />
        </Box>
      ) : data.length ? null : (
        <Text color={"gray.400"} textAlign={"center"}>
          No coupons available at the moment.
        </Text>
      )}
    </Box>
  );
};

export default Coupon;
