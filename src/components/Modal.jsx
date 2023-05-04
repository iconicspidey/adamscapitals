import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

export default function SignupModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleTogglePassword() {
    setShowPassword(!showPassword);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Handle form submission here
    onClose();
  }

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        PAY & JOIN NOW
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="fullName" isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                style={{ borderColor: "gray.300", borderRadius: "md" }}
              />
            </FormControl>

            <FormControl id="email" isRequired mt={4}>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                style={{ borderColor: "gray.300", borderRadius: "md" }}
              />
            </FormControl>

            <FormControl id="password" isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  style={{ borderColor: "gray.300", borderRadius: "md" }}
                />
                <InputRightElement>
                  <Button
                    size="sm"
                    onClick={handleTogglePassword}
                    fontSize="sm">
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="gray"
              mr={3}
              onClick={onClose}
              style={{ borderColor: "gray.300", borderRadius: "md" }}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              style={{
                borderColor: "blue.300",
                borderRadius: "md",
                bg: "blue.400",
                _hover: { bg: "blue.500" },
              }}>
              Proceed
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
