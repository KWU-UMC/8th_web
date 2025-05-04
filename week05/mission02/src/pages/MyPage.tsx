import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);
      setData(response);
    };
    getData();
  }, []);
  //useEffect를 사용하여 컴포넌트가 마운트될 때 getMyInfo 함수를 호출한다.
  //getMyInfo 함수는 서버에 내 정보를 요청하는 함수이다.

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <div>
      <h1>{data?.data.name}님 환영합니다.</h1>
      <img src={data?.data.avatar as string} alt="google logo" />
      <button
        className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default MyPage;
