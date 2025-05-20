import { axiosInstance } from "./axios";

export const uploadImage = async (formData: FormData) => {
  const response = await axiosInstance.post("/v1/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
