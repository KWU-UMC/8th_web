import axios from "axios";
import { LPComments, LPResponse, LPSResponse } from "../types/lptype";

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

type CreateLpI = {
  accessToken: string;
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published?: boolean;
};
export const create_lp = async ({
  accessToken,
  title,
  content,
  thumbnail,
  tags,
  published = true,
}: CreateLpI) => {
  const url = `${import.meta.env.VITE_BASE_URL}/lps`;

  try {
    await axios.post(
      url,
      {
        title,
        content,
        thumbnail,
        tags,
        published,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  } catch (error) {
    console.error(error);
  }
};

type ModifyLpI = {
  lpId: string;
  accessToken: string;
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published?: boolean;
};
export const modify_lp = async ({
  lpId,
  accessToken,
  title,
  content,
  thumbnail,
  tags,
  published = true,
}: ModifyLpI) => {
  const url = `${import.meta.env.VITE_BASE_URL}/lps/${lpId}`;
  try {
    await axios.patch(
      url,
      { title, content, thumbnail, tags, published },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  } catch (error) {
    console.error(error);
  }
};

export const delete_lp = async ({
  lpId,
  accessToken,
}: {
  lpId: string;
  accessToken: string;
}) => {
  const url = `${import.meta.env.VITE_BASE_URL}/lps/${lpId}`;
  try {
    await axios.delete(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    console.error(error);
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

export const create_comment = async ({
  lpId,
  content,
  accessToken,
}: {
  lpId: string;
  content: string;
  accessToken: string;
}) => {
  const url = `${import.meta.env.VITE_BASE_URL}/lps/${lpId}/comments`;
  try {
    await axios.post(
      url,
      { content },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  } catch (error) {
    console.error(error);
  }
};

export const delete_comment = async ({
  lpId,
  commentId,
  accessToken,
}: {
  lpId: string;
  commentId: number;
  accessToken: string;
}) => {
  const url = `${
    import.meta.env.VITE_BASE_URL
  }/lps/${lpId}/comments/${commentId}`;

  try {
    await axios.delete(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    console.error(error);
  }
};

export const modify_comment = async ({
  lpId,
  commentId,
  content,
  accessToken,
}: {
  lpId: string;
  commentId: number;
  content: string;
  accessToken: string;
}) => {
  const url = `${
    import.meta.env.VITE_BASE_URL
  }/lps/${lpId}/comments/${commentId}`;
  try {
    await axios.patch(
      url,
      { content },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  } catch (error) {
    console.error(error);
  }
};

export const like = async ({
  lpId,
  accessToken,
}: {
  lpId: string;
  accessToken: string;
}) => {
  const url = `${import.meta.env.VITE_BASE_URL}/lps/${lpId}/likes`;

  try {
    await axios.post(
      url,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  } catch (error) {
    console.error(error);
  }
};
