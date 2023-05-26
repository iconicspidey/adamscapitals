import axios from "axios";
const axiosFetch = () => {
  const url = "https://dull-gray-seagull-gown.cyclic.app/api";

  const instance = axios.create({
    baseURL: url,
  });
  return instance;
};
export default axiosFetch;
