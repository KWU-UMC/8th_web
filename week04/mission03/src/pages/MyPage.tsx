import { useEffect } from "react";
import { getMyInfo } from "../apis/auth";

const MyPage = () => {
  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);
    };
    getData();
  }, []);
  //useEffect를 사용하여 컴포넌트가 마운트될 때 getMyInfo 함수를 호출한다.
  //getMyInfo 함수는 서버에 내 정보를 요청하는 함수이다.

  return <div>MyPage</div>;
};

export default MyPage;
