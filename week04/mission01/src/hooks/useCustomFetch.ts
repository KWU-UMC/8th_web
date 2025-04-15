import axios from "axios";
import { useEffect, useState } from "react";

interface ApiResponse<T> {
  // 제네릭 타입으로 정의한 이유는 data의 타입이 고정 되어 있지 않기 때문
  data: T | null;
  isPending: boolean;
  isError: boolean;
}

type Language = "ko-KR" | "en-US"; // 지원하는 언어 타입 정의

function useCustomFetch<T>(
  url: string,
  language: Language = "en-US" // 기본 언어를 "en-US"로 설정
): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  //영화 목록 같은 경우 null이 아닌 빈 배열로 초기화 해도 되지만
  //영화 상세 정보 같은 경우 null로 초기화 해야함
  //왜냐하면 영화 상세 정보는 단일 객체이기 때문
  //useState의 제네릭 타입을 T로 설정하여 data의 타입을 동적으로 지정
  //useState의 초기값을 null로 설정하여 데이터가 로드되기 전까지는 null로 초기화

  const [isPending, setIsPending] = useState(false);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true); // API 요청 시작할 때 로딩 상태 true로 변경
      try {
        const { data } = await axios.get<T>(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
          params: {
            language: language,
          },
        });
        setData(data); // API 요청이 성공하면 data 상태에 저장)
      } catch {
        setIsError(true); // 에러가 발생하면 에러 상태 true로 변경
      } finally {
        setIsPending(false); // 성공하든 실패하든 API 요청이 끝나면 로딩 상태 false로 변경
      }
    };
    fetchData();
  }, [url, language]); // url이 바뀔 때마다 요청

  return { data, isPending, isError }; // API 응답 데이터와 상태 반환
}

export default useCustomFetch;
