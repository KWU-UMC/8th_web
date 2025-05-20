import { useEffect, useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { getMyinfo, patchMyInfo } from "../apis/auth";
import type { TUserInfo } from "../types/TUser";
import HomePage from "./HomePage";
import { FiSettings } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const MyPage = () => {
  const [data, setData] = useState<TUserInfo>();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { setUserName } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const response = await getMyinfo();
      setData(response);
      setName(response?.data?.name || "");
      setBio(response?.data?.bio || "");
      setAvatar(response?.data?.avatar || "");
    };
    getData();
  }, []);

  const { mutate: updateUserInfo } = useMutation({
    mutationFn: () => patchMyInfo({ name, bio, avatar }),
    onSuccess: () => {
      if (!data?.data) return;
      setIsEditMode(false);
      setData({
        ...data,
        data: {
          ...data.data,
          name,
          avatar,
          bio,
        },
      });
      setUserName(name);
    },
    onError: (err) => {
      console.error("업데이트 실패", err);
    },
  });

  const handleAvatarClick = () => {
    if (isEditMode && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="text-white flex flex-col items-center pt-20">
        <div className="flex items-start gap-6 mb-6">
          <div className="relative">
            <img
              src={avatar}
              alt="profile"
              className="w-28 h-28 rounded-full object-cover cursor-pointer"
              onClick={handleAvatarClick}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              {isEditMode ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent border border-white rounded px-4 py-2 text-white focus:outline-none"
                />
              ) : (
                <div className="text-xl font-bold">{data?.data?.name}</div>
              )}

              <button
                onClick={() => {
                  if (isEditMode) {
                    updateUserInfo();
                  } else {
                    setIsEditMode(true);
                  }
                }}
                className="text-white hover:text-gray-300 transition text-xl"
              >
                <FiSettings />
              </button>
            </div>

            {isEditMode ? (
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="bg-transparent border border-white rounded px-4 py-2 text-white focus:outline-none"
              />
            ) : (
              <div className="text-sm">{data?.data?.bio}</div>
            )}

            <p className="text-white text-sm mb-6">{data?.data?.email}</p>
          </div>
        </div>
      </div>
      <HomePage />
    </>
  );
};

export default MyPage;
