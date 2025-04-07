
# 🧠 학습 키워드 요약 정리

## 📌 React Router v6
- **`createBrowserRouter` / `RouterProvider`**  
  → React Router v6에서 사용하는 방식으로, 라우트 설정을 객체 형태로 관리할 수 있음.

- **`path: "movies/:movieId"`**  
  → URL의 특정 값을 동적으로 받아오기 위한 경로 설정 방식.

- **`useParams()`**  
  → URL의 파라미터 값을 추출하는 hook (ex. `movieId`).

- **`Outlet`**  
  → 부모 라우트 안에 자식 라우트를 렌더링해주는 컴포넌트.

---

## 📌 Axios & 비동기 처리

- **`axios.get()`**  
  → 외부 API를 호출하는 Promise 기반 HTTP 클라이언트.

- **`useEffect(() => { ... }, [deps])`**  
  → 컴포넌트 마운트 시 또는 특정 값이 바뀔 때 사이드 이펙트 처리.

- **`async/await` + `try-catch-finally`**  
  → 에러 핸들링 및 로딩 상태 관리할 때 사용하는 기본 구조.

---

## 📌 상태 관리 (로딩 & 에러)

- **`useState<boolean>(false)`**  
  → `isPending`, `isError` 상태를 boolean으로 선언하여 조건부 렌더링에 활용.

- **조건부 렌더링 예시**
  ```tsx
  if (isPending) return <LoadingSpinner />;
  if (isError) return <Error />;
  ```

---

## 📌 타입스크립트 (TypeScript)

- **타입 선언 예시**
  ```ts
  export type Movie = {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    ...
  };
  ```

- **Props 타입 지정**
  ```tsx
  interface MovieCardProps {
    movie: Movie;
  }
  ```

---

## 📌 UI 구성 (Tailwind CSS 활용)

- **`flex`, `grid`, `gap`, `justify-center`, `items-center`**  
  → 컴포넌트 정렬 및 레이아웃을 위한 유틸리티 클래스.

- **반응형 디자인**
  ```html
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" />
  ```

- **로딩/에러 UX 개선**  
  → 사용자 경험을 위한 시각적 피드백 제공.

---

## ✅ 실전에서 느낀 점
- API 문서와 URL 구조를 정확히 이해하는 것이 중요함.
- 상태에 따라 UI를 나눠 처리하는 조건부 렌더링이 필수.
- 타입을 명확히 정의하면 개발 속도가 더 빨라지고 안정성이 증가함.
- 반복되는 UI 요소는 컴포넌트로 분리하는 게 유지보수에 용이함.
