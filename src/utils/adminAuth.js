// src/utils/useAuth.js
import { useQuery } from "react-query";
import axiosFetch from "../configs/axiosConfig";

const adminAuth = async (token) => {
  const response = await axiosFetch().get("/admin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const useAuth = (token) => {
  const { data, error, isError, isLoading } = useQuery(
    "admin",
    () => adminAuth(token), // pass the token to the query function
  );

  return {
    data,
    error,
    isError,
    isLoading,
  };
};

export default useAuth;
