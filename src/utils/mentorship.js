// src/utils/useMentorship.js
import { useQuery } from "react-query";
import axiosFetch from "../configs/axiosConfig";
import { useSelector, useDispatch } from "react-redux";
import { setCourses } from "../redux-slice/coursesSlice";

const fetchCoupons = async () => {
  const response = await axiosFetch().get("/mentorship");
  return response.data;
};
const useFetchCoupons = () => {
  const dispatch = useDispatch();
  const coupons = useSelector((state) => state.courses); // Replace with your actual state slice

  const { data, isLoading, error, isError, isSuccess, isFetched } = useQuery(
    "mentorship",
    fetchCoupons,
    {
      enabled: coupons.length === 0,
      onSuccess: (data) => {
        dispatch(setCourses(data)); // Store fetched data in Redux store
      },
    },
  );

  return {
    data: coupons.length > 0 ? coupons : data,
    isLoading,
    error,
    isError,
    isSuccess,
    isFetched,
  };
};
export default useFetchCoupons;
