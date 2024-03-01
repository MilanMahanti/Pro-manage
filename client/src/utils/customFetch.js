import axios from "axios";
axios.defaults.withCredentials = true;
const customFetch = axios.create({
  baseURL: "https://pro-manage-backend-silk.vercel.app/api/v1",
});

export default customFetch;
