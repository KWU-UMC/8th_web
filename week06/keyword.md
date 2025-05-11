- `Tanstack Query Devtools`는 무엇인가요?

  - **Tanstack Query Devtools는 무엇인가요?**

    `Tanstack Query Devtools`

    개발자가 Tanstack Query를 통해 관리되고 있는 쿼리 상태, 캐시된 데이터 등을 시각적으로 확인할 수 있게 도와주는 개발 도구
    쿼리의 현재 상태, 에러 여부 등을 실시간으로 쉽게 디버깅 가능

  - **Tanstack Query Devtools는** 어떻게 세팅하나요?

    **세팅 방법**

    1. 설치

       ```jsx
       npm install @tanstack/react-query-devtools
       yarn add @tanstack/react-query-devtools
       pnpm add @tanstack/react-query-devtools
       ```

    2. 상위 파일에서 import(App.js)

       ```jsx
       import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
       ```

    3. 실행

       ```python
       import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

       function App() {
         return (
           <QueryClientProvider client={queryClient}>
             {/* 애플리케이션 컴포넌트 */}
             <ReactQueryDevtools initialIsOpen={true} />
           </QueryClientProvider>
         )
       ```

       **개발 환경일 때만 `Devtools`가 보이도록 세팅하려면**

    ```python
    {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    ```

    `import.meta.env.DEV`를 활용해 조건부 렌더링을 하면 된다.

- `useCustomFetch` 커스텀 훅과 비교했을 때 `useQuery`는 어떤 장점이 있나요?

  useQuery는 단순한 데이터 패칭을 넘어서 자동화된 상태 관리와 다양한 부가기능 제공

  | 항목                      | `useCustomFetch` 커스텀 훅         | `useQuery`                           |
  | ------------------------- | ---------------------------------- | ------------------------------------ |
  | **데이터 캐싱**           | 기본적으로 없음 (직접 구현해야 함) | 자동으로 캐싱 (중복 요청 방지)       |
  | **로딩/에러 상태 관리**   | 직접 작성해야 함                   | 내장됨 (`isLoading`, `error`등 제공) |
  | **자동 리패칭**           | 수동 트리거 필요                   | 포커스 복귀 시 자동 재요청 등        |
  | **쿼리 키로 식별**        | 없음                               | `queryKey`로 요청 구분 및 관리       |
  | **Devtools 제공**         | 없음                               | 개발자 도구로 요청 상태 확인 가능    |
  | **백그라운드 업데이트**   | 직접 구현해야 함                   | 가능                                 |
  | **쿼리 무효화 및 리패칭** | 구현 필요                          | `invalidateQueries`로 간편           |

- `gcTime` vs `staleTime`

  - `gcTime`은 무엇인가요?

    사용되지 않는 데이터가 메모리에서 제거되는 시간
    기본적으로 5분 후에 가비지 컬렉션 수행

  - `staleTime`은 무엇인가요?

    데이터를 최신(fresh) 상태로 유지할 시간
    이 시간 동안은 포커스를 다시 받아도 자동 refetch가 일어나지 않음
    staleTime이 지나면 데이터는 stale 상태가 되어, refetch 대상이 됨

  - 두 값을 어떤 식으로 설정하여야 `캐싱 전략에 유리`한가요?

    - gcTime 길게 설정
      - 자주 변경되지 않는 데이터 → refetch 최소화 → 네트워크 비용 ↓
    - staleTime 길게 설정

      - 동일한 데이터를 여러 곳에서 공유하거나, 다시 돌아올 가능성이 높은 경우 → 캐시 재사용 ↑

- `오프셋 기반 페이지네이션`과 `커서 기반 페이지네이션`에 대해 정리해보세요!

  - `오프셋 기반 페이지네이션`의 장/단점 (`offset-based pagination`)

    - `오프셋 기반 페이지네이션`은 무엇인가요?

      LIMIT과 OFFSET 값을 기반으로 데이터의 특정 위치에서 일정 개수만큼 가져오는 방식

    - `오프셋 기반 페이지네이션`의 장점?

      구현 간단, 직관적
      특정 페이지로 임의 접근 쉬움

    - `오프셋 기반 페이지네이션`의 단점?

      데이터가 변경되면 중복되거나 누락된 데이터가 표시될 수 있음
      페이지 번호가 높을수록 성능 저하 가능

  - `커서 기반 페이지네이션`의 장/단점 (`cursor-based pagination`)

    - `커서 기반 페이지네이션`은 무엇인가요?

      현재 커서(위치)를 기준으로 이후 데이터를 가져오는 방식

    - `커서 기반 페이지네이션`의 장점

      데이터가 변경돼도 중복, 누락 없이 안정적으로 페이지 유지
      정렬 순서 보장

    - `커서 기반 페이지네이션`의 단점

      임의 페이지 접근이 어려움

- `Skeleton UI`는 무엇인가요?

  - Skeleton UI는 무엇인가요?

    실제 데이터가 렌더링되기 전 화면에 보이게 될 윤곽을 그려주는 로딩 애니메이션

  - Skeleton UI를 활용했을 때 장점에 대해 정리해주세요

    UX 개선, 더 부드러운 화면 전환 가능
