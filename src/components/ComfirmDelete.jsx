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
import axiosFetch from "../configs/axiosConfig";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCousrse } from "../redux-slice/coursesSlice";
export default function ComfirmDelete({ props }) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = props;
  const [loading, setLoading] = useState(false);
  const comfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await axiosFetch().delete(`/delete-course/${id}`);
      setLoading(false);
      onClose();
      dispatch(deleteCousrse(id));
    } catch (error) {
      setLoading(false);
      onClose();
    }
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Remove
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="gray.900">
          <ModalHeader color={"ButtonShadow"}>Delete Item</ModalHeader>
          <ModalBody color={"Window"}>
            Are you sure you want to delete this course?
          </ModalBody>
          <ModalFooter>
            <Button variant="solid" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              onClick={comfirmDelete}
              colorScheme="red">
              Comfirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
