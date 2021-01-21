import axios from "axios";

const AxiosSet = axios.create({
  baseURL: "http://15.206.118.222:5000/admin/auth/login",
});

export const logInService = () => {
  axios.post();
};
