import {
  Box,
  Text,
  Flex,
  ButtonGroup,
  Button,
  useBreakpointValue,
  Switch,
  Stack,
  FormControl,
  FormLabel,
  useClipboard,
  IconButton,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import moment from "moment";
import axiosFetch from "../../configs/axiosConfig";

const CouponCard = ({
  id,
  coupon,
  type,
  isActive,
  expireDate,
  timestamp,
  price,
  refetch,
}) => {
  const now = moment();
  const expiryMoment = moment(expireDate);
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });
  const { onCopy, hasCopied } = useClipboard(coupon);
  const toggle = async (id, status) => {
    try {
      await axiosFetch().patch(`/coupon/${id}`, { status });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  const removeCoupon = async (id) => {
    try {
      await axiosFetch().delete(`/coupon/${id}`);
      refetch();
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <Box
      // width={['100%','100%' , "48%", '45%']}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      bg="gray.900"
      color="white"
      flex={isLargeScreen ? "0 0 400px" : "1 0 auto"}
    >
      <Text
        fontSize="2xl"
        mb="4"
        textTransform={"capitalize"}
        textAlign="center"
      >
        {type}
      </Text>
      <Flex direction="column">
        <Flex my="2" alignItems={"center"} justifyContent={"space-between"}>
          <Text fontSize="lg">Coupon Code: {coupon}</Text>
          <IconButton
            variant="outline"
            _hover={{ backgroundColor: "none" }}
            aria-label="Call Sage"
            icon={<CopyIcon />}
            onClick={onCopy}
          />
        </Flex>
        <Text fontSize="lg" mb="2">
          Price: ${price}
        </Text>
        <Flex mb="2" gap={"5px"}>
          <Text fontSize="lg">Expiration Date:</Text>
          <Text
            fontSize="lg"
            color={`${!now.isAfter(expireDate) ? "green.300" : "red.400"}`}
          >
            {now.isAfter(expireDate)
              ? "Expired"
              : moment(expireDate).format("MMMM D, YYYY h:mm:ss A")}
          </Text>
        </Flex>

        <Text fontSize="lg" mb={"2"} textTransform={"capitalize"}>
          Type: {type}
        </Text>
        <Text fontSize="lg" mb={"2"} textTransform={"capitalize"}>
          created: {moment(timestamp).fromNow()}
        </Text>
        <Text fontSize="lg" mb={"2"} textTransform={"capitalize"}>
          Status: {isActive ? "Active" : "Inactive"}
        </Text>
        <Flex justify={"space-between"} mt={"10px"}>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb="0">
              State
            </FormLabel>

            <Switch
              id="email-alerts"
              size={"lg"}
              isChecked={isActive ? true : false}
              isDisabled={now.isAfter(expiryMoment)}
              colorScheme="whatsapp"
              onChange={() => toggle(id, isActive ? 0 : 1)}
            />
          </FormControl>
          <Button onClick={() => removeCoupon(id)} colorScheme={"red"}>
            Delete
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CouponCard;
