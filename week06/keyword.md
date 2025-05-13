### 키워드 정리 🍠

- `Tanstack Query`는 무엇인가요?
  ### Tanstack Query란 ?
  `Tanstack Query`(구 React Query)는 서버 상태 관리, 비동기 데이터 패칭 및 캐싱, 동기화를 효과적으로 처리할 수 있도록 도와주는 라이브러리입니다.
  ```tsx
  // 적합한 환경에 따라 선택하여 설치해주시면 됩니다. bun도 사용하셔도 상관 없습니다.
  pnpm install @tanstack/react-query
  npm install @tanstack/react-query
  yarn add @tanstack/react-query
  ```
  **설정 방법**
  React 애플리케이션의 최상위 컴포넌트에서 `QueryClient`와 `QueryClientProvider`를 사용하여 전체 앱에 `Tanstack Query`를 적용합니다.
  ```tsx
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

  const queryClient = new QueryClient();

  function App() {
    return (
      <QueryClientProvider client={queryClient}>
        {/* 애플리케이션 컴포넌트 페이지 컴포넌트 등등 */}
      </QueryClientProvider>
    );
  }
  export default App;
  ```
- `Tanstack Query Devtools`는 무엇인가요? 🍠
  - **Tanstack Query Devtools는 무엇인가요?** 🍠
    React 애플리케이션에서 TanStack Query(React Query)로 상태 관리를 할 때, 쿼리 상태를 시각적으로 확인하고 디버깅할 수 있게 하여 좀 더 쉽게 다룰 수 있게 도와주는 전용 devtools
  - **Tanstack Query Devtools는** 어떻게 세팅하나요? 🍠
      <aside>
      ❓
      
      `Devtools` 세팅 방법을 위의 `Tanstack Query` 설명처럼 적어주시면 좋습니다!
      
      아래 공식 문서를 참고해주세요!
      
      추가적으로 이런 개발에 도움이 되는 도구들은 실제 배포환경에서 보여주는 것은 바람직 하지 않습니다.
      
      개발 환경일 때만 `Devtools`가 보이게 세팅할려면 어떻게 코드를 작성해야할까요?
      
      직접 작성해보시고, 모르시는 분은 강의 영상에서 제가 정리해드릴 예정이니 강의 영상을 본 후 작성해주셔도 좋습니다!
      
      - UMC 8th 중앙 웹 파트장 매튜 / 김용민 - 
      
      </aside>
      
      ```
      pnpm add @tanstack/react-query-devtools
      //해당 명령어로 설치
      ```
      
      ```
      import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
      
      function App() {
        return (
          <QueryClientProvider client={queryClient}>
            {/* The rest of your application */}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        )
      }
      //React 앱 내에서 해당 코드로 설정
      ```
      
      https://tanstack.com/query/v5/docs/framework/react/devtools

- **`useQuery` 는 무엇인가요?** (커스텀 훅과 비교) \*\*\*\*🍠
  ### useQuery
  `useQuery`는 단일 데이터 요청을 수행하며, 데이터 캐싱, 로딩/에러 상태 관리 및 자동 재요청 등의 기능을 제공합니다.
  **사용법**
  ```tsx
  import { useQuery } from "@tanstack/react-query";

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    return res.json();
  };

  function TodosComponent() {
    const { data, error, isLoading, refetch } = useQuery({
      queryKey: ["todos"],
      queryFn: fetchTodos,
      staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선도 유지
    });

    if (isLoading) return <div>로딩 중!</div>;
    if (error) return <div>에러입니다!</div>;

    return (
      <ul>
        {data?.map((todo: any) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    );
  }
  ```
  - `useCustomFetch` 커스텀 훅과 비교했을 떄 `useQuery`는 어떤 장점이 있나요? 🍠
    `useCustomFetch` : `fetch` 나 `axios` 같은 요청 도구를 기반으로 직접 만듦
    `useQuery`: TanStack Query에서 제공하는 완성도 높은 비동기 상태 관리 도구
    `useQuery` 는 `useCustomFetch` 과 달리, 자동 캐싱 + 공유, 쿼리 상태 관리, 쿼리 무효화/리패치, 백그라운드 리패치, Devtools 제공 등 다양한 기능이 더욱 많음
- **`useQuery`**의 주요 옵션
  ### useQuery의 다양한 옵션
  - **queryKey**
    - **설명:** 해당 쿼리를 고유하게 식별하는 키. (배열이나 문자열 형태)
    - **용도:** 캐싱, 데이터 갱신, 중복 요청 방지에 사용.
  - **queryFn**
    - **설명:** 데이터를 비동기로 패칭하는 함수.
    - **용도:** Promise를 반환해야 하며, 실제 API 호출 로직을 포함.
  - **gcTime**
    - **설명:** 사용되지 않는 쿼리 데이터가 메모리에서 제거되기까지의 시간 (밀리초 단위).
    - **용도:** 메모리 관리와 불필요한 데이터 보관 방지.
  - **enabled**
    - **설명:** 쿼리 실행을 조건부로 활성화할지 결정하는 불리언 값.
    - **용도:** 특정 조건(예: 인증 상태)에 따라 데이터 패칭 여부를 제어.
  - **networkMode**
    - **설명:** 쿼리의 네트워크 요청 동작 모드를 지정 (예: 오프라인, 온라인 모드 등).
    - **용도:** 네트워크 상태에 따른 데이터 패칭 로직 제어.
  - **initialData**
    - **설명:** 쿼리의 초기 데이터 값.
    - **용도:** 최초 렌더링 시 이미 가지고 있는 데이터를 활용하여 빠른 UI 표시.
  - **initialDataUpdatedAt**
    - **설명:** 초기 데이터가 설정된 시점의 타임스탬프.
    - **용도:** 초기 데이터의 신선도 판단에 사용.
  - **meta**
    - **설명:** 사용자가 추가로 전달할 수 있는 메타 데이터.
    - **용도:** 로깅, 디버깅, 또는 특정 로직을 위해 커스텀 정보를 저장.
  - **notifyOnChangeProps**
    - **설명:** 어떤 속성 변화가 컴포넌트 리렌더링을 유발할지 지정.
    - **용도:** 불필요한 리렌더링을 줄여 성능 최적화.
  - **placeholderData**
    - **설명:** 실제 데이터가 도착하기 전까지 임시로 보여줄 데이터.
    - **용도:** 사용자에게 즉각적인 UI 피드백 제공.
  - **queryKeyHashFn**
    - **설명:** queryKey를 해싱할 때 사용하는 커스텀 함수.
    - **용도:** 복잡한 queryKey의 일관된 캐싱을 위해 사용.
  - **refetchInterval**
    - **설명:** 데이터 자동 refetch 간격 (밀리초 단위).
    - **용도:** 주기적으로 최신 데이터를 유지.
  - **refetchIntervalInBackground**
    - **설명:** 앱이 백그라운드 상태일 때도 refetch를 계속할지 여부.
    - **용도:** 사용자가 백그라운드에서도 데이터 최신성을 유지해야 할 경우 사용.
  - **refetchOnMount**
    - **설명:** 컴포넌트 마운트 시 refetch 여부.
    - **용도:** 화면 전환 등으로 인해 최신 데이터를 항상 불러와야 하는 경우.
  - **refetchOnReconnect**
    - **설명:** 네트워크 재연결 시 자동으로 refetch할지 여부.
    - **용도:** 네트워크 장애 후 최신 데이터 복원.
  - **refetchOnWindowFocus**
    - **설명:** 브라우저 창에 포커스가 돌아올 때 refetch할지 여부.
    - **용도:** 사용자가 페이지로 돌아왔을 때 데이터를 최신 상태로 유지.
  - **retry**
    - **설명:** 쿼리 실패 시 재시도 횟수 (숫자 또는 함수 형태로 제어 가능).
    - **용도:** 일시적 네트워크 오류 시 자동 복구.
  - **retryOnMount**
    - **설명:** 컴포넌트 마운트 시 재시도 여부.
    - **용도:** 초기 로딩 실패 후 재시도 로직 제어.
  - **retryDelay**
    - **설명:** 재시도 사이의 대기 시간 (밀리초 단위).
    - **용도:** 연속된 재시도 사이의 간격 조절.
  - **select**
    - **설명:** 패칭된 데이터를 가공하여 반환하는 함수.
    - **용도:** 컴포넌트에 필요한 데이터 형태로 변환.
  - **staleTime**
    - **설명:** 데이터가 신선하다고 간주되는 시간 (밀리초 단위).
    - **용도:** 이 시간 동안은 자동 refetch가 발생하지 않음.
  - **structuralSharing**
    - **설명:** 데이터 갱신 시 구조적 공유를 활용하여 불필요한 리렌더링을 방지.
    - **용도:** 데이터 참조 보존 및 최적화.
  - **subscribed**
    - **설명:** 내부적으로 사용되는 옵션으로, 쿼리의 구독 상태를 관리.
    - **용도:** Tanstack Query 내부 로직에서 활용.
  - **throwOnError**
    - **설명:** 에러 발생 시 에러를 throw하여, 에러 핸들링을 강제할지 결정.
    - **용도:** 에러가 컴포넌트 밖으로 전달되어 예외 처리되도록 할 때 사용.
- `gcTime`과 `staleTime`의 차이점에 대해 정리해보세요! 🍠
  ### `gcTime` vs `staleTime`
    <aside>
    ❓
    
    **gcTime**과 **staleTime**의 개념을 다시 정리해주시고, 두 값을 어떤 식으로 설정하면 캐싱 전략에 유리한지 설명해주세요!
    
    </aside>
    
    - `gcTime`은 무엇인가요? 🍠
        - Garbage Collection Time
        - Garbage Collection이 수행되는데 걸리는 시간
        - Garbage Collection: 프로그램에서 더 이상 사용되지 않는 객체나 메모리를 자동으로 해제하는 메커니즘을 말함
    - `staleTime`은 무엇인가요? 🍠
        - 주로 데이터 캐싱 또는 상태 관리에서 사용됨
        - 데이터가 신선하지 않거나 오래된 상태를 의미하는 ‘stale’ 상태에 도달하는 데 걸리는 시간을 정의
        - staleTIme이 짧음 → 데이터가 자주 업데이트 되고 오래된 데이터로 간주되는 시간이 빨리 옴
            
            staleTIme이 김 → 데이터가 더 오랜 시간 동안 신선하게 유지되고, 서버에 대한 요청이 적어짐
            
    - 두 값을 어떤 식으로 설정하여야 `캐싱 전략에 유리`한가요? 🍠
        - 데이터의 특성: 자주 변하는 데이터는 짧은 `staleTime`과 짧은 `gcTime`을 설정하여 데이터의 신선도를 유지하면서, 서버 요청을 적절히 분배
        - 메모리 관리: `gcTime`을 짧게 설정하면 메모리가 효율적으로 관리
            
            긴 `gcTime`을 설정하면 데이터를 장기적으로 캐싱하여 성능을 개선
            
        - 서버 요청 최적화: `staleTime`이 길면 서버 요청을 줄일 수 있지만, 오래된 데이터가 사용자에게 노출될 수 있기 때문에, 사용자 경험을 고려하여 적절한 값으로 설정.
- **`오프셋 기반 페이지네이션`**과 **`커서 기반 페이지네이션`**에 대해 정리해보세요! 🍠
  - `오프셋 기반 페이지네이션`의 장/단점 (`offset-based pagination`) 🍠
    - `오프셋 기반 페이지네이션`은 무엇인가요? 🍠
      - 데이터베이스나 API에서 데이터를 여러 페이지로 나누어 보여줄 때 사용하는 방식 중 하나
      - "어디서부터 시작할지"와 "몇 개의 항목을 가져올지"를 설정하여 데이터를 나누는 방법
      - **Offset**: 데이터를 가져올 시작 위치
      - **Limit**: 한 번에 가져올 데이터 항목의 수
    - `오프셋 기반 페이지네이션`의 장점? 🍠
      - 구현이 간단하고 직관적: `OFFSET`과 `LIMIT`만으로 쉽게 구현할 수 있음
      - 사용자 경험 개선: 데이터를 페이지별로 나누어 사용자에게 나누어 보여줄 수 있어 큰 데이터셋을 효율적으로 관리할 수 있음
      - 서버 자원 절약: 한 번에 많은 데이터를 요청하는 대신, 필요한 만큼만 요청하므로 서버의 부담을 줄일 수 있음
    - `오프셋 기반 페이지네이션`의 단점? 🍠
      - 성능 저하 (큰 오프셋 사용 시): 데이터셋이 매우 크거나 페이지 번호가 커질수록 성능 문제가 발생할 수 있음
      - 데이터 변경에 민감: 페이지를 넘길 때마다 데이터가 추가되거나 삭제되면 페이지네이션에 문제가 생길 수 있음
      - 리소스 낭비: 큰 오프셋을 사용할 경우, 데이터베이스에서 많은 양의 데이터를 건너뛰게 되므로, 불필요한 리소스를 사용할 수 있음
  - `커서 기반 페이지네이션`의 장/단점 (`cursor-based pagination`) 🍠
    - `커서 기반 페이지네이션`은 무엇인가요? 🍠
      - 데이터베이스에서 데이터를 페이지 단위로 나눠서 가져오는 방식 중 하나
      - 고유한 식별자(주로 ID)를 기준으로 데이터를 순차적으로 가져오는 방식
      - 데이터의 정확한 위치를 기준으로 페이징을 진행
    - `커서 기반 페이지네이션`의 장점 🍠
      - 성능 최적화: 커서 기반 페이지네이션은 `OFFSET`을 사용하지 않기 때문에, 큰 데이터셋에서 성능이 매우 우수
      - 일관성 유지: 데이터가 추가되거나 삭제될 때도 페이지네이션이 안정적으로 작동
      - 페이지 이동 시 무결성 보장: 커서 기반 페이지네이션은 `last_seen_id`를 기준으로 요청하므로, 사용자가 페이지를 넘기거나 새로 고침을 하더라도 중복되거나 누락된 데이터가 발생하지 않음
    - `커서 기반 페이지네이션`의 단점 🍠
      - 불가능한 랜덤 접근: 커서 기반 페이지네이션은 페이지 번호 기반으로 이동하는 것이 아니라 직접적으로 커서를 기준으로 데이터를 가져오기 때문에, 사용자가 특정 페이지로 바로 이동할 수 없음
      - 커서 관리 필요: 커서 값을 클라이언트에서 관리해야 하므로, 상태 관리에 주의해야 함. 클라이언트에서 `last_seen_id`를 추적하거나 상태를 저장해야 하므로 조금 더 복잡할 수 있음.
- **`useInfiniteQuery`**는 무엇인가요?
  ### useInfiniteQuery
  `useInfiniteQuery`는 페이지네이션이나 무한 스크롤을 구현할 때 사용되는 훅으로, 여러 페이지에 걸친 데이터 패칭과 연결을 손쉽게 처리할 수 있도록 도와줍니다.
  **사용법**
  ```tsx
  import { useInfiniteQuery } from "@tanstack/react-query";

  const fetchPosts = async ({ pageParam = 0 }) => {
    const res = await fetch(`/api/posts?page=${pageParam}`);
    return res.json();
  };

  function InfinitePostsComponent() {
    const { data, error, isLoading, fetchNextPage, hasNextPage } =
      useInfiniteQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
        // 마지막 페이지 정보를 바탕으로 다음 페이지 번호를 결정합니다.
        getNextPageParam: (lastPage, pages) => lastPage.nextPage ?? false,
      });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error occurred!</div>;

    return (
      <div>
        {data?.pages.map((page, pageIndex) => (
          <ul key={pageIndex}>
            {page?.data.map((post: any) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        ))}
        {hasNextPage && (
          <button onClick={() => fetchNextPage()}>Load More</button>
        )}
      </div>
    );
  }
  ```
- **`useInfiniteQuery`**의 주요 옵션
  ### **useInfiniteQuery**의 주요 옵션
  - **주요 옵션들**
    - **queryKey**
      - 캐싱 및 식별을 위한 유니크 키 (배열 형태 권장)
    - **queryFn**
      - 페이지 정보를 받아 비동기 데이터 패칭 함수. 기본적으로 `pageParam` 값을 사용하며, 초기값을 설정할 수 있음.
    - **getNextPageParam**
      - 마지막 페이지 데이터를 바탕으로 다음 페이지의 `pageParam` 값을 결정하는 함수
      - 반환 값이 `false` 혹은 `undefined`이면 추가 페이지가 없음을 의미합니다.
    - **getPreviousPageParam**
      - (필요한 경우) 이전 페이지의 파라미터를 결정하는 함수
    - **staleTime, cacheTime 등**
      - 일반 useQuery와 유사하게 데이터의 신선도 및 캐싱 전략을 설정할 수 있음
    - **refetchOnWindowFocus, enabled 등**
      - 조건부 패칭 및 자동 재요청 옵션들을 동일하게 활용 가능
- `Skeleton UI`는 무엇인가요? 🍠
  - Skeleton UI는 무엇인가요? 🍠
    - 사용자가 콘텐츠가 로드될 때 보여주는 로딩 화면의 일종
    - 완전히 로드된 화면을 가리기 전에 사용자에게 콘텐츠가 로드 중임을 시각적으로 알리기 위한 UI 패턴
    - 주요 콘텐츠가 로드되기 전에 **빈 공간**이나 **애니메이션된 뼈대 형태**의 UI 요소들을 보여줌
  - Skeleton UI를 활용했을 때 장점에 대해 정리해주세요 🍠
    - 빠른 로딩 감지: 콘텐츠가 로드되기 전에 UI가 공간을 채우기 때문에, 사용자는 로딩 중임을 빠르게 인식할 수 있음
    - 사용자 경험 향상: 사용자에게 페이지의 구조를 미리 보여주기 때문에 로딩 시간이 길어도 덜 지루하게 느껴짐. 또한, 콘텐츠가 어느 정도 자리를 차지하고 있다는 느낌을 주기 때문에, 사용자는 로딩 중임을 직관적으로 이해함
    - 전환 효과로 부드럽게 연결: 실제 콘텐츠로 부드럽게 전환되므로, 화면이 갑자기 바뀌는 느낌을 줄여줌
    - 응답성: 동적 콘텐츠 로딩에 잘 어울려, 네트워크 환경이 느리거나 서버에서 데이터를 처리하는데 시간이 걸릴 때, 사용자에게 응답성을 제공
