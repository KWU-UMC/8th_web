import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  console.log(data);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo(); //비동기적으로 사용자 정보를 가져온다.
      console.log(response);
      setData(response); // 가져온 사용자 정보를 상태에 저장한다.
      //response는 ResponseMyInfoDto 타입으로, 사용자 정보를 담고 있다.
    };
    getData();
  }, []);
  // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 getMyInfo 함수를 호출하여 사용자 정보를 가져온다.
  // 컴포넌트가 마운트 될때 getMyInfo 함수를 호출하는 이유는
  // 마운트 될때마다 사용자 정보를 가져오기 위해서이다.
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  // 로그아웃 버튼 클릭 시 작동하는 함수
  // logout 함수를 호출하고, 완료되면, 홈페이지로 이동한다.
  // 비동기 처리를 하는 이유는 로그아웃이 완료된 후에 페이지를 이동하기 위해서이다.
  return (
    <div>
      {/* 🔥 아바타 이미지 출력 */}
      <img
        src={"/images/google.svg"}
        alt="구글 아바타"
        width={80}
        height={80}
        style={{ borderRadius: "50%" }}
      />
      <h1>{data?.data.name}님 환영합니다.</h1>
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
