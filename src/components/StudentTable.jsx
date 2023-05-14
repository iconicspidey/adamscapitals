import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Text,
} from "@chakra-ui/react";

const StudentTable = () => {
  const students = [
    {
      id: 1,
      name: "John Doe",
      email: "Basic",
      plan: "gold",
      subscriptionDetails: "Active",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "Premium",
      plan: "gold",
      subscriptionDetails: "Inactive",
    },
    {
      id: 3,
      name: "Bob Smith",
      email: "Basic",
      plan: "gold",
      subscriptionDetails: "Active",
    },
  ].sort(() => Math.random() - 0.5);

  return (
    <Box overflowX="auto">
      <Text color="whiteAlpha.800" textAlign="center" fontSize="2xl">
        Students
      </Text>
      <Table
        margin="auto"
        maxWidth={{ base: "full", md: "lg", lg: "2xl" }}
        variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Plan</Th>
            <Th>Plan expire</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map((student) => (
            <Tr color="white" key={student.id}>
              <Td>{student.name}</Td>
              <Td>{student.email}</Td>
              <Td>{student.plan}</Td>
              <Td>{Date.name}</Td>
              <Td>
                <Button colorScheme="red">Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default StudentTable;
