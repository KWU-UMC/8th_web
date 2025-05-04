import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto["data"] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log("받은 응답:", response);
      setData(response.data); // ✅ 핵심 수정
    };
    getData();
  }, []);

  if (!data) return <div>불러오는 중...</div>;

  return <div>{data.name}</div>;
};

export default MyPage;
