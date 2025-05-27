import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { useUpdateProfile } from "../hooks/mutations/useUpdateProfile";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ResponseMyInfoDto } from "../types/auth";
import { Check } from "lucide-react";

const MyPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const updateProfileMutation = useUpdateProfile();

  const [myInfo, setMyInfo] = useState<ResponseMyInfoDto["data"] | null>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMyInfo();
      setMyInfo(response.data);
      setName(response.data.name);
      setBio(response.data.bio ?? "");
      setAvatar(response.data.avatar ?? "");
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSave = () => {
    updateProfileMutation.mutate(
      { name, bio, avatar },
      {
        onSuccess: () => alert("수정 성공!"),
        onError: () => alert("수정 실패"),
      }
    );
  };

  if (!myInfo) return <div className="text-white p-4">로딩 중...</div>;

  return (
    <div className="bg-black min-h-screen text-white p-8 flex justify-center items-start">
      <div className="flex gap-10 items-start p-8 rounded-xl w-full max-w-3xl shadow-lg">
        {/* 왼쪽: 프로필 사진 */}
        <div className="flex-shrink-0">
          <img
            src={avatar || "https://via.placeholder.com/150"}
            alt="프로필"
            className="w-36 h-36 rounded-full object-cover border border-gray-600"
          />
        </div>

        {/* 오른쪽: 정보 입력 */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 p-2 rounded bg-[#2a2a2a] border border-gray-600"
            />
            <button onClick={handleSave}>
              <Check className="text-green-400" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="한줄 소개"
              className="flex-1 p-2 rounded bg-[#2a2a2a] border border-gray-600"
            />
            <button onClick={handleSave}>
              <Check className="text-green-400" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="프로필 이미지 URL"
              className="flex-1 p-2 rounded bg-[#2a2a2a] border border-gray-600"
            />
            <button onClick={handleSave}>
              <Check className="text-green-400" />
            </button>
          </div>

          {/* 이메일은 수정 안 됨 */}
          <div className="text-sm text-gray-300 mt-2">{myInfo.email}</div>

          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 px-4 py-2 rounded hover:bg-red-600 w-fit"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
