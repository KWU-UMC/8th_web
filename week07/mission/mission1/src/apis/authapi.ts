import axios from "axios";

interface SigninI {
  email: string;
  password: String;
}
export const signin = async ({ email, password }: SigninI) => {
  const url = `${import.meta.env.VITE_BASE_URL}/auth/signin`;
  try {
    const { data } = await axios.post(url, { email, password });
    return data;
  } catch (error) {
    console.error("sign in api request error: ", error);
  }
};

interface SignupI {
  name: string;
  email: string;
  password: string;
}
export const signup = async ({ name, email, password }: SignupI) => {
  const url = `${import.meta.env.VITE_BASE_URL}/auth/signup`;
  try {
    await axios.post(url, {
      name,
      email,
      password,
    });
  } catch (error) {
    console.error("sign up api request error: ", error);
  }
};

export const upload_img = async ({
  file,
  accessToken,
}: {
  file: File;
  accessToken: string;
}) => {
  const url = `${import.meta.env.VITE_BASE_URL}/uploads`;
  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await axios.post(url, formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data.data;
  } catch (error) {
    console.error(error);
  }
};
