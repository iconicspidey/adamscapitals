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
import { useNavigate } from "react-router-dom";

export default function SignupModal() {
  const navigate = useNavigate();
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
    onClose();
    navigate("/dashboard");
  }

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        PAY & JOIN NOW
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="gray.900">
          <ModalHeader color="#fff">Sign up</ModalHeader>
          <ModalCloseButton color="#fff" />
          <ModalBody>
            <form action="">
              <FormControl id="fullName" isRequired>
                <FormLabel color="#fff">Full Name</FormLabel>
                <Input
                  backgroundColor="gray.700"
                  color="gray.100"
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  style={{ borderColor: "gray.300", borderRadius: "md" }}
                />
              </FormControl>

              <FormControl id="email" isRequired mt={4}>
                <FormLabel color="#fff">Email Address</FormLabel>
                <Input
                  backgroundColor="gray.700"
                  color="gray.100"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  style={{ borderColor: "gray.300", borderRadius: "md" }}
                />
              </FormControl>

              <FormControl id="password" isRequired mt={4}>
                <FormLabel color="#fff">Password</FormLabel>
                <InputGroup>
                  <Input
                    backgroundColor="gray.700"
                    color="gray.100"
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
            </form>
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
