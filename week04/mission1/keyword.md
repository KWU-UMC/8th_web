# 📘 useEffect란?

`useEffect`는 **React의 훅(Hook)** 중 하나로,  
컴포넌트가 **렌더링된 이후 특정 작업(side effect)을 수행**하도록 만드는 함수입니다.

보통 다음과 같은 작업에 사용됩니다:

- API 호출 (fetch, axios 등)
- 이벤트 등록 및 해제
- 타이머 설정 (`setInterval`, `setTimeout`)
- 로컬스토리지 접근
- 컴포넌트 상태 변화에 따른 후속 작업

---

## 🧠 기본 문법

```tsx
useEffect(() => {
  // 실행할 코드
}, [의존성 배열]);
```

콜백 함수 컴포넌트가 렌더링된 후 실행할 코드
의존성 배열 [] 배열 안의 값이 변경될 때만 다시 실행됨. 비워두면 최초 한 번만 실행됨

# ✅ 전체 흐름 정리

```tsx
import { useEffect, useState } from "react";

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // 1. 비동기 함수 정의
    const fetchData = async () => {
      try {
        // 2. API 호출
        const response = await fetch("https://api.example.com/data");

        // 3. JSON 변환
        const result = await response.json();

        // 4. 상태에 저장
        setData(result);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    // 5. 함수 호출
    fetchData();
  }, []); // 컴포넌트가 처음 마운트될 때만 실행

  return (
    <div>
      {data ? <p>데이터: {JSON.stringify(data)}</p> : <p>로딩 중...</p>}
    </div>
  );
};
```

# 📌 주요 개념 설명

## 1. useEffect(() => { ... }, [])

마운트 시(첫 렌더링 시) 한 번만 실행됨

배열 안의 값이 바뀌면 그때마다 다시 실행됨

## 2. async 함수는 직접 useEffect에 넣을 수 없음

이렇게 하면 안 됨 ->

```tsx
useEffect(async () => {
  const res = await fetch("...");
}, []);
```

그래서 async 함수는 useEffect 내부에서 정의하고 즉시 호출해야 함

## 3. setData(result)

useState를 통해 받은 setter로 API 응답을 저장함

## 🧹 클린업 함수 (return)

이벤트 리스너 제거, 타이머 해제 등 정리 작업에 사용

```tsx
useEffect(() => {
  const timer = setTimeout(() => {
    console.log("3초 후 실행");
  }, 3000);

  return () => {
    clearTimeout(timer); // 언마운트 시 정리
  };
}, []);
```
