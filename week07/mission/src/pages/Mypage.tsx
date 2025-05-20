import { useEffect, useState } from "react";
import { getMyInfo, updateMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Mypage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto>();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      setData(response);
      setName(response.data.name);
      setBio(response.data.bio || "");
      setAvatar(response.data.avatar || "");
    };
    getData();
  }, []);

  const updateMutation = useMutation({
    mutationFn: ({ name, bio, avatar }: { name: string; bio: string; avatar: string }) =>
      updateMyInfo({ name, bio, avatar }),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["myInfo"] });
      const previous = queryClient.getQueryData<ResponseMyInfoDto>(["myInfo"]);

      queryClient.setQueryData(["myInfo"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: { ...old.data, ...newData },
        };
      });

      return { previous };
    },
    onSuccess: async () => {
      const response = await getMyInfo();
      setData(response);
      setEditMode(false);
    },
    onError: (_err, _new, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["myInfo"], context.previous);
        setData(context.previous);
      }
      alert("업데이트 실패");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
    },
  });

  const handleSave = () => {
    if (!name.trim()) {
      alert("이름은 비워둘 수 없습니다.");
      return;
    }
    updateMutation.mutate({ name, bio, avatar });
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">
          {data?.data?.name}님 환영합니다
        </h1>
        <img
          src={data?.data?.avatar || avatar}
          className="w-24 h-24 rounded-full mx-auto mb-4 shadow"
        />

        {editMode ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-2 border p-2 rounded w-full"
              placeholder="이름"
            />
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mb-2 border p-2 rounded w-full"
              placeholder="자기소개"
            />
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="mb-4 border p-2 rounded w-full"
              placeholder="프로필 이미지 URL"
            />
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg mr-2"
            >
              저장
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-6 rounded-lg"
            >
              취소
            </button>
          </>
        ) : (
          <>
            <h2 className="text-lg text-gray-700 mb-2">{data?.data?.email}</h2>
            <p className="text-gray-600 mb-6">{data?.data?.bio || "자기소개가 없습니다."}</p>
            <div className="flex flex-col gap-3 items-center">
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:scale-105"
              >
                설정
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition duration-200 transform hover:scale-105"
              >
                로그아웃
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Mypage;
