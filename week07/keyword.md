### useMutation

- 데이터를 가져오는 useQuery와는 다르게, 서버에 데이터를 생성(Create), 수정(Update), 삭제(Delete) 할 때 사용하는 훅
- 기존에는 직접 fetch를 사용해 비동기 로직을 처리했지만, useMutation을 사용하면 요청 상태와 결과 처리를 더 깔끔하게 다룰 수 있음
- 재시도, 에러 처리, 후처리 로직도 쉽게 넣을 수 있어 API 요청을 처리할 때 훨씬 편리

#### 주요 옵션

- mutationFn: 실제 데이터를 변경하는 비동기 함수(API 요청)
- onSuccess: 성공 후 처리할 작업
- onError: 실패 시 에러 처리
- onMutate: Optimistic Update를 할 때 사용되는 사전 작업 함수

### optimistic update

- 서버 응답을 기다리지 않고, 요청이 성공할 거라고 가정하고 먼저 UI를 업데이트하는 방식
- 장점: 빠른 반응, 네트워크 지연에도 UX가 부드러움
- 단점: 요청 실패 시 롤백 로직을 잘 짜야 함, 잠시 동안 서버 데이터와 불일치 가능
