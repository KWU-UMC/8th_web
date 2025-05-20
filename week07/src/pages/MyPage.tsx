import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";

const MyPage = () => {
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const [isEditingName, setisEditingName] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        console.log("받은 응답:", response);
        setData(response);
      } catch (err) {
        console.error("getMyInfo 실패:", err);
      }
    };
    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  if (!data) return <div>불러오는 중...</div>;

  return (
    <div className=" flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center gap-3">
        <p className="flex justify-center">{data.data?.name}님 환영합니다.</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;
