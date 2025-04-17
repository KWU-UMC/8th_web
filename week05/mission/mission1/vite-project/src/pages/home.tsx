import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth_context";
import { useEffect, useState } from "react";
import { lps } from "../apis/lps";
import { LPResponse } from "../types/lp_type";
import LPItem from "../components/lp";

export default function Home() {
  const { isLoggedIn, setIsLoggedIn, accessToken, isAccessTokenValid } =
    useAuth();
  const [data, setData] = useState<LPResponse | null>(null);
  const navigate = useNavigate();

  const onClick = async () => {
    // 로그인 상태 확인
    if (isLoggedIn) {
      // AccessToken이 유효한지 확인
      const response = await isAccessTokenValid();
      if (!response) {
        setIsLoggedIn(false);
        navigate("/login");
      } else {
        navigate("/newlp");
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await lps.mylps(accessToken);
        setData(response);
      } catch (error) {
        console.error("api request error: ", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="w-full p-4">
      <button onClick={onClick}>LP 생성</button>
      <div className="flex flex-col justify-center items-center gap-10">
        {data?.data.data.map((item) => (
          <LPItem key={item.id} item={item}></LPItem>
        ))}
      </div>
    </div>
  );
}
