- **Tanstack Query Devtools는 무엇인가요?** 🍠
  개발 과정에서 확인이 필요한 prop이나 state를 보기 편리하게 해줌.
- **Tanstack Query Devtools는** 어떻게 세팅하나요? 🍠
  우선 설치한 후에 ReactQueryDevTools를 불러오면 됩니다.
  By default, React Query Devtools are only included in bundles when process.env.NODE_ENV === 'development', so you don't need to worry about excluding them during a production build.
  React Query에서 알아서 처리를 해주긴 하지만 안전하게 하기 위해서 VITE에서는
  {import.meta.env.DEV && <ReactQueryDevtools />} 이런 식으로 처리하는 것 같습니다.

- `useCustomFetch` 커스텀 훅과 비교했을 떄 `useQuery`는 어떤 장점이 있나요? 🍠
  staleTime, enabled 같이 다양한 기능들을 제공해주고 추후에 queryKey를 이용해 원하는 데이터를 쉽게 조작할 수 있는 장점이 있습니다.

- `gcTime`은 무엇인가요? 🍠
  비활성화(inactive)된 캐시 데이터를 메모리에 얼마나 보관할지를 설정합니다. 설정한 시간이 지나면 해당 캐시는 삭제됩니다.
- `staleTime`은 무엇인가요? 🍠
  데이터가 stale상태로 바뀌는 시간을 설정합니다. 데이터가 stale상태가 되면 해당 데이터를 필요로 할 때 데이터를 다시 불러옵니다.
- 두 값을 어떤 식으로 설정하여야 `캐싱 전략에 유리`한가요? 🍠
  어떤 데이터냐에 따라 다른데

  1. 일반적인 데이터의 경우 gcTime이 staleTime보다 약간 더 크게 설정해주는 것이 좋다. (ex. staleTime: 1000 _ 60 _ 3, gcTime: 1000 _ 60 _ 10
  2. 주식 가격과 같은 실시간 정보가 필요할 때는
  3. staleTime: 0 , gcTime: 1000 \* 60

- `오프셋 기반 페이지네이션`의 장/단점 (`offset-based pagination`) 🍠
  - `오프셋 기반 페이지네이션`은 무엇인가요? 🍠
    데이터의 시작으로부터 얼마나 생략을 하고 결정하고 데이터를 불러오는 방식이다.
  - `오프셋 기반 페이지네이션`의 장점? 🍠
    크기가 작은 데이터셋에 유리하다.
  - `오프셋 기반 페이지네이션`의 단점? 🍠
    느리다
- `커서 기반 페이지네이션`의 장/단점 (`cursor-based pagination`) 🍠

  - `커서 기반 페이지네이션`은 무엇인가요? 🍠
    특정 아이템 이후의 데이터들을 불러오는 방식이다.
  - `커서 기반 페이지네이션`의 장점 🍠
    빠르다. 실시간 데이터에 용이.
  - `커서 기반 페이지네이션`의 단점 🍠
    구현이 오프셋 기반 페이지네이션보다 복잡하다.

- Skeleton UI는 무엇인가요? 🍠
  실제 데이터가 로딩되기 전에 들어올 데이터의 형태와 비슷한 모양을 표시해주는 것이다.
- Skeleton UI를 활용했을 때 장점에 대해 정리해주세요 🍠
  빈 화면이나 로딩 바가 돌아가는 것보다 좋은 사용자 경험을 줄 수 있다.
