import axios from "axios";
import { LPComments, LPResponse, LPSResponse } from "../types/lptype";
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

export const lpComments = async ({
  id,
  cursor = 0,
  order = "asc",
  accessToken,
}: {
  id: string;
  cursor: number;
  order: string;
  accessToken: string;
}) => {
  const url = `${
    import.meta.env.VITE_BASE_URL
  }/lps/${id}/comments?cursor=${cursor}&limit=10&order=${order}`;

  try {
    const { data } = await axios.get<LPComments>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error("comments request failed: ", error);
  }
};
