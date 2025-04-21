import axios from "axios";
import { LPResponse, LPSResponse } from "../types/lptype";

export const lps = async ({ cursor = 0, limit = 10, order = "asc" }) => {
  const url = `${
    import.meta.env.VITE_BASE_URL
  }/lps?cursor=${cursor}&limit=${limit}&order=${order}`;

  try {
    const response = await axios.get<LPSResponse>(url);
    return response.data;
  } catch (error) {
    console.error("lps request failed: ", error);
  }
};

export const lp = async ({ id }: { id: number }) => {
  const url = `${import.meta.env.VITE_BASE_URL}/lps/${id}`;

  try {
    const response = await axios.get<LPResponse>(url);
    return response.data;
  } catch (error) {
    console.error("lp request failed: ", error);
  }
};
