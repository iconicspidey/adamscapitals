import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Text,
  Icon,
  AlertIcon,
} from "@chakra-ui/react";
import axiosFetch from "../configs/axiosConfig";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteStudent } from "../redux-slice/studentsSlice";
import { WarningIcon } from "@chakra-ui/icons";
export default function DeleteStudent({ props }) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id, name } = props;
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const comfirmDelete = async () => {
    console.log(name);
    try {
      setLoading(true);
      const response = await axiosFetch().delete(`/delete-student/${id}`);
      const { status } = response;
      if (status == 200) {
        setLoading(false);
        onClose();
        dispatch(deleteStudent(id));
        toast({
          status: "success",
          duration: 5000,
          isClosable: true,
          description: `${name} has been remove`,
        });
      }
    } catch (error) {
      setLoading(false);
      onClose();
    }
  };

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Remove
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="gray.900">
          <ModalHeader color={"ButtonShadow"}>Delete Student</ModalHeader>
          <ModalBody color={"Window"}>
            Are you sure you want to remove
            <Text color="teal">{name}</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              leftIcon={<WarningIcon />}
              colorScheme="telegram"
              mr={3}
              onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              onClick={comfirmDelete}
              colorScheme="whatsapp">
              Comfirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
