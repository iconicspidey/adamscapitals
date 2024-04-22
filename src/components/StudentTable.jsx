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
  Button,
  Avatar,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import axiosFetch from "./../configs/axiosConfig";
import DeleteStudent from "./DeleteStudent";
import { useQuery } from "react-query";
import moment from "moment";
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";
const StudentTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const {
    data: students,
    status,
    isLoading,
    error,
    isSuccess,
    refetch,
  } = useQuery("courses", async () => {
    const response = await axiosFetch().get("/users");
    // const response = await axiosFetch().get(`/users?page=${currentPage}`);
    return response.data;
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = (students, indexOfFirstItem, indexOfLastItem) =>
    students.slice(indexOfFirstItem, indexOfLastItem);
  const nextPage = (page) => {
    if (page === currentPage) return;
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const totalPage = (students) => Math.ceil(students.length / itemsPerPage);
  return (
    <Box overflowX="auto">
      <Text color="whiteAlpha.800" textAlign="center" fontSize="2xl">
        Students
      </Text>
      <Table
        margin="auto"
        // maxWidth={{ base: "full", md: "md", lg: "lg" }}
        maxWidth={{ base: "90%", md: "80%", lg: "70%" }}
        maxHeight="50px"
        variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Status</Th>
            <Th>Plan</Th>
            <Th>Date join</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody fontSize={"sm"}>
          {isSuccess &&
            currentItems(students, indexOfFirstItem, indexOfLastItem).map(
              (student, index) => (
                <Tr color="white" key={index}>
                  <Td>
                    <Box display={"flex"} flexDir={"column"} gap={2}>
                      <Avatar name={student.full_name} />
                      <Text>{student.full_name}</Text>
                    </Box>
                  </Td>
                  <Td>{student.email}</Td>
                  <Td>
                    {student.payment_ref ? (
                      <Text color="lightgreen">Active</Text>
                    ) : (
                      <Text color="red.400">Inactive</Text>
                    )}
                  </Td>
                  <Td>
                    {student && student.plan
                      ? student.plan > 1
                        ? student.plan + " years"
                        : `${student.plan} year `
                      : "No Plan"}
                  </Td>
                  <Td>
                    {student.payment_ref
                      ? moment(student.createdAt).format("DD/MM/YYYY")
                      : "Not join"}
                  </Td>
                  <Td>
                    <DeleteStudent
                      props={{
                        id: student.user_id,
                        name: student.full_name,
                        fetchTable: refetch,
                      }}
                    />
                  </Td>
                </Tr>
              )
            )}
        </Tbody>
      </Table>
      {isSuccess ? (
        <Box py={"20px"} display={"flex"} justifyContent={"space-evenly"}>
          <Button
            onClick={prevPage}
            disabled={currentPage === 1}
            leftIcon={<ArrowLeftIcon />}
            style={{ marginRight: "10px" }}>
            Previous
          </Button>
          <Text color={"white"}>{`${currentPage} /${Math.ceil(
            students.length / itemsPerPage
          )}`}</Text>
          <Button
            onClick={() => nextPage(totalPage(students))}
            rightIcon={<ArrowRightIcon />}>
            Next
          </Button>
        </Box>
      ) : null}
      {isLoading ? (
        <Spinner m={"20px auto"} display="block" color="blue.500" size="xl" />
      ) : null}
    </Box>
  );
};

export default StudentTable;
