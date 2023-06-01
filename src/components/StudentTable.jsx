import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useEffect } from "react";
import axiosFetch from "./../configs/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import DeleteStudent from "./DeleteStudent";
import { useQuery } from "react-query";
import moment from "moment";
const StudentTable = () => {
  const dispatch = useDispatch();
  const {
    data: students,
    status,
    isLoading,
    error,
  } = useQuery("courses", async () => {
    const response = await axiosFetch().get("/users");
    return response.data;
  });

  return (
    <Box overflowX="auto">
      <Text color="whiteAlpha.800" textAlign="center" fontSize="2xl">
        Students
      </Text>
      <Table
        margin="auto"
        maxWidth={{ base: "full", md: "md", lg: "lg" }}
        variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Plan</Th>
            <Th>Plan status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!isLoading &&
            students.map((student, index) => (
              <Tr color="white" key={index}>
                <Td>{student.full_name}</Td>
                <Td>{student.email}</Td>
                <Td>{student.plan}</Td>
                <Td>
                  {moment().diff(student.createdAt, "month") <= 1 ? (
                    <Text color="lightgreen">Active</Text>
                  ) : (
                    <Text color="red.400">Expired</Text>
                  )}
                </Td>
                <Td>
                  <DeleteStudent
                    props={{ id: student.user_id, name: student.full_name }}
                  />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      {isLoading ? (
        <Spinner m={"20px auto"} display="block" color="blue.500" size="xl" />
      ) : null}
    </Box>
  );
};

export default StudentTable;
