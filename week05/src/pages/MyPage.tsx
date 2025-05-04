import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";

const MyPage = () => {
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log("받은 응답:", response);
      setData(response); // ✅ 전체 응답을 setData에 저장
    };
    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  if (!data) return <div>불러오는 중...</div>;

  return (
    <div className="flex flex-col items-center gap-3">
      <p>{data.data?.name}님 환영합니다.</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
