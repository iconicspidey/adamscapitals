import { useQuery } from "react-query";
import axiosFetch from "../configs/axiosConfig";
const fetchBook = async () => {
  const response = await axiosFetch().get("/book");
  return response.data;
};
const useFetchBook = () => {
  const { data, isLoading, error, isError, isSuccess, isFetched } = useQuery(
    "book",
    fetchBook,
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

export default useFetchBook;
