import axios from "axios";

export const lps = {
  mylps: async (accessToken: string) => {
    const url = `${
      import.meta.env.VITE_BASE_URL
    }/lps/user?cursor=0&limit=10&order=asc`;

    try {
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return data;
    } catch (error) {
      console.error("api request error: ", error);
    }
  },
};
