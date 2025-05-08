import axios from "axios";

export const user = async ({
  userId,
  accessToken,
}: {
  userId: string;
  accessToken: string;
}) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users/${userId}`;
  try {
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const modify_user = async ({
  name,
  bio,
  avatar,
  accessToken,
}: {
  name: string;
  bio: string;
  avatar: string;
  accessToken: string;
}) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users`;

  try {
    await axios.patch(
      url,
      { name, bio, avatar },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
  } catch (error) {
    console.error(error);
  }
};

export const delete_user = async (accessToken: string) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users`;

  try {
    await axios.delete(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    console.error(error);
  }
};
