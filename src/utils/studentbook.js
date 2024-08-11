import { useQuery } from "react-query";
import axiosFetch from "../configs/axiosConfig";
const fetcheBook = async (id) => {
  const response = await axiosFetch().get(`/ebook/${id}`);
  return response.data;
};
const useFetchStudenBook = (id) => {
  const { data, isLoading, error, isError, isSuccess, isFetched } = useQuery(
    "ebook",
    () => fetcheBook(id),
  );
  return {
    data,
    isLoading,
    error,
    isError,
    isSuccess,
    isFetched,
  };
};

export default useFetchStudenBook;
