import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import usePatchUserInfo from "../hooks/mutations/usePatchUserInfo";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";

const DEFAULT_AVATAR =
  "https://api.dicebear.com/6.x/identicon/svg?seed=default";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout, accessToken } = useAuth();

  const { data: userData } = useGetMyInfo(accessToken);
  const { mutate: patchUserInfo } = usePatchUserInfo();

  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (userData) {
      const { name, bio, avatar } = userData.data;
      setName(name ?? "");
      setBio(bio ?? "");
      setAvatar(avatar ?? "");
    }
  }, [userData]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert("닉네임은 필수입니다.");
      return;
    }

    patchUserInfo({ name, bio, avatar });
    setIsEditMode(false);
  };

  const handleCancel = () => {
    if (userData) {
      const { name, bio, avatar } = userData.data;
      setName(name ?? "");
      setBio(bio ?? "");
      setAvatar(avatar ?? "");
    }
    setIsEditMode(false);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-10 text-white">
      <h2 className="text-2xl font-bold">마이페이지</h2>

      {/* 🔽 아바타 */}
      <img
        src={avatar || DEFAULT_AVATAR}
        alt="avatar"
        className="w-24 h-24 rounded-full object-cover border-2 border-white"
      />

      {/* 🔽 닉네임 */}
      {isEditMode ? (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white"
        />
      ) : (
        <h3 className="text-xl text-gray-400 font-semibold">{name}</h3>
      )}

      {/* 🔽 Bio */}
      {isEditMode ? (
        <input
          placeholder="자기소개"
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white w-80"
        />
      ) : (
        <p className="text-gray-400">{bio || "자기소개가 없습니다."}</p>
      )}

      {/* 🔽 아바타 URL */}
      {isEditMode && (
        <input
          placeholder="아바타 URL"
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white w-80"
        />
      )}

      {/* 🔽 버튼 */}
      <div className="flex gap-3 mt-2">
        {isEditMode ? (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded"
            >
              저장
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
            >
              취소
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditMode(true)}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded"
          >
            설정
          </button>
        )}

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;
