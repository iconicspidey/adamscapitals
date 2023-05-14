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
import { WarningIcon } from "@chakra-ui/icons";
export default function ComfirmDelete() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
            Are you sure you want to delete this item?
          </ModalBody>
          <ModalFooter>
            <Button variant="solid" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose} colorScheme="red">
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
