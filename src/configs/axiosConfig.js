import axios from "axios";
const axiosFetch = () => {
  const url = "https://adamcapitals-backend.onrender.com/api";
  // const url = "http://localhost:5000/api";
  const instance = axios.create({
    baseURL: url,
  });
  return instance;
};
export default axiosFetch;
