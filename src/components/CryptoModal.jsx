import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBitcoin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosFetch from "../configs/axiosConfig";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { WarningIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { useQuery } from "react-query";
export default function CryptoModal({
  price,
  whatsapp,
  role,
  logged,
  user_id,
}) {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const proceed = async () => {
    if (!logged) return navigate("/account");
    if (role !== "student") return navigate("/admin");
    const whatsappLink = whatsapp ? whatsapp : null;
    const body = { price, whatsapp: whatsappLink, user_id: user_id };

    setLoading(true);
    try {
      const response = await axiosFetch().post("/crypto", body);
      const { url } = response.data;

      window.location.href = url;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <Button
        width={"100%"}
        colorScheme="whatsapp"
        leftIcon={<FaBitcoin />}
        onClick={onOpen}>
        Pay with binance
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="gray.900">
          <ModalHeader color={"ButtonShadow"}>
            Note <WarningTwoIcon />{" "}
          </ModalHeader>
          <ModalBody color={"Window"}>
            You will be redirected to the Binance payment page after making the
            payment. Please return to your dashboard to verify the payment.
          </ModalBody>
          <ModalFooter>
            <Button
              rightIcon={<WarningTwoIcon />}
              colorScheme="orange"
              mr={3}
              onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              onClick={proceed}
              rightIcon={<FaBitcoin />}
              colorScheme="whatsapp">
              proceed
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
