import axios from "axios";
import { LPResponse, LPSResponse } from "../types/lptype";
import { useAuth } from "../contexts/authcontext";

export const lps = async ({ cursor = 0, limit = 20, order = "asc" }) => {
  const url = `${
    import.meta.env.VITE_BASE_URL
  }/lps?cursor=${cursor}&limit=${limit}&order=${order}`;

  try {
    const { data } = await axios.get<LPSResponse>(url);
    return data.data;
  } catch (error) {
    console.error("lps request failed: ", error);
  }
};

export const lp = async ({ id }: { id: string }) => {
  const url = `${import.meta.env.VITE_BASE_URL}/lps/${id}`;

  try {
    const response = await axios.get<LPResponse>(url);
    return response.data;
  } catch (error) {
    console.error("lp request failed: ", error);
  }
};

export const lpComments = async ({ id }: { id: string }) => {
  const url = `${import.meta.env.VITE_BASE_URL}/lps/${id}/comments`;
  const { accessToken } = useAuth();

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("comments request failed: ", error);
  }
};
