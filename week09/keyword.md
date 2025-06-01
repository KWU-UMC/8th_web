**Props-Drilling**

- props를 오로지 하위 컴포넌트로 전달하는 용도로만 쓰이는 컴포넌트를 거치면서 React 컴포넌트 트리의 한 부분에서 다른 부분으로 데이터를 전달하는 과정
- 이를 어떻게 해결할 수 있을까요?
  1. 전역 상태관리 라이브러리 사용
  2. children을 적극적으로 사용

**useReducer**

- 복잡한 상태 로직을 관리하거나, 여러 상태가 서로 관련되어 있을 때 사용되는 React Hook

```
const [state, dispatch] = useReducer(reducer, initialState);
```

- `state`: 현재 상태
- `dispatch`: 액션을 발생시키는 함수
- `reducer`: 상태 전이를 정의하는 함수

**Redux vs Redux Toolkit**

- redux-toolkit과 redux의 차이 (왜 **`redux-toolkit`**을 더 많이 활용하나요?)

| 분류                     | redux                                | redux toolkit                                      |
| ------------------------ | ------------------------------------ | -------------------------------------------------- |
| 코드량                   | 많다                                 | 적다                                               |
| immutable 추가           | 업데이트 미지원                      | 업데이트 지원                                      |
| createSlice 함수 추가    | 상태, 액션, 리듀서를 개별적으로 작성 | createSlice 함수로 상태, 액션, 리듀서 한 번에 생성 |
| configureStore 함수 추가 | 스토어 생성 코드를 따로 작성         | configureStore 함수로 스토어 생성                  |
| 기본적인 미들웨어        | 미포함                               | 몇 가지 포함                                       |

- redux-toolkit 사용법

  `Provider`

  Redux toolkit를 사용하기 위해서 루트 컴포넌트를 provider로 감싸야 한다.

  `configureStore`

  Redux store를 구성하는 메서드

  리듀서, 미들웨어 설정 및 store 반환

  `createSlice`

  리듀서를 작성하는 유틸리티 메서드

  초기 상태 및 리듀서 함수를 정의하고 액션 생성 함수를 자동으로 생성

  `useSelector`

  Redux store에서 store를 가져오는 훅

  `useDispatch`

  Redux store에서 액션을 dispatch하는 훅

  컴포넌트에서 redux store의 state 변경 가능

  기타 redux-toolkit 사용 방법을 상세하게 정리해 보세요

  `createAsyncThunk`

  비동기 작업을 수행하는 action creator를 생성하는 유틸리티 메서드

  `createEntityAdapter`

  비정규화된 엔티티 데이터를 쉽게 관리할 수 있는 메서드

**Zustand**

- 경량화된 전역 상태 관리 라이브러리
- Redux보다 설정이 간단하고, 코드가 짧고 명료함
- React Context나 Redux보다 성능 좋음
- 상태 관리에 Provider 불필요
- 자동으로 리렌더링 최적화
