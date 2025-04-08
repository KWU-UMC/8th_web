import axios from "axios";

export const postSignin = async (email: string, password: string) => {
  const response = await axios.post("http://localhost:8000/v1/auth/signin", {
    email,
    password,
  });
  return response;
};