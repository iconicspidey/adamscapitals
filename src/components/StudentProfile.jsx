import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
function StudentProfile() {
  const toast = useToast();
  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const handleForm = (e) => {
    e.preventDefault();
    if (names !== "" && email !== "") {
      toast({
        title: "profile update",
        description: "user profile has been update successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Box maxW="500px" m="auto">
        <form onSubmit={handleForm} action="">
          <FormControl mb={4}>
            <FormLabel color="white">Full Name</FormLabel>
            <Input
              backgroundColor="gray.900"
              color="#f2f2f2"
              placeholder="Full Name"
              isRequired
              type="text"
              value={names}
              onChange={(e) => setNames(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel color="white">Email</FormLabel>
            <Input
              isRequired
              backgroundColor="gray.900"
              color="#f2f2f2"
              placeholder="Email"
              type="password"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="whatsapp" type="submit">
            Change Profile
          </Button>
        </form>
      </Box>
    </>
  );
}

export default StudentProfile;
