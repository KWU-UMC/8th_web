### 키워드 정리 🍠

- Props-Drilling 🍠
  - Props-Drilling은 무엇인가요?
    - Props-Drilling: React 애플리케이션에서 상위 컴포넌트에서 하위 컴포넌트로 props(속성)를 계속 전달해야 하는 상황
    - 문제점
      - 코드 가독성 저하
      - 재사용성 저하
      - 유지보수 어려움
  - 이를 어떻게 해결할 수 있을까요?
    1. Context API
    ```tsx
    const UserContext = React.createContext();

    function Parent() {
      const user = { name: "철수", age: 20 };
      return (
        <UserContext.Provider value={user}>
          <Child />
        </UserContext.Provider>
      );
    }

    function GrandChild() {
      const user = React.useContext(UserContext);
      return (
        <div>
          {user.name}의 나이는 {user.age}살입니다.
        </div>
      );
    }
    ```
    1. 상태관리 라이브러리 사용 (e.g. Redux, Recoil, Zustand 등)
- **`useReducer`** 🍠
  https://youtu.be/9ISInVDo5m0?si=Y43GTVSDerVncPBi
    <aside>
    🍠
    
    위의 영상을 보고 **`useReducer`**에 대해 정리해주세요!
    
    또한 아래 공식문서 또한 읽어보시면서 부족한 내용을 보충해서 정리해주세요!
    
    https://react.dev/reference/react/useReducer
    
    </aside>
    
    - **`useReducer`** 에 대하여 정리해주세요! 🍠
        
        `useReducer` : `useState` 와 비슷하게 컴포넌트 상태를 관리하는 훅이지만, 더 복잡한 상태 로직이나 여러 상태가 서로 의존적일 때 유용함. Redux의 개념과 유사하게 동작함.
        
        ```tsx
        import React, { useReducer } from 'react';
        
        // 1. 초기 상태
        const initialState = { count: 0 };
        
        // 2. 리듀서 함수 정의
        function reducer(state, action) {
          switch (action.type) {
            case 'increment':
              return { count: state.count + 1 };
            case 'decrement':
              return { count: state.count - 1 };
            default:
              return state;
          }
        }
        
        // 3. 컴포넌트에서 사용
        function Counter() {
          const [state, dispatch] = useReducer(reducer, initialState);
        
          return (
            <>
              <p>Count: {state.count}</p>
              <button onClick={() => dispatch({ type: 'increment' })}>+</button>
              <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            </>
          );
        }
        ```

- **`Redux`** vs **`Redux Toolkit`** 🍠
    <aside>
    💡 Redux Toolkit은 한 번에 완벽히 이해하기 어려울 수 있습니다. 공식 문서와  다양한 블로그 글을 차근차근 살펴보시면서, 워크북의 토글을 꼼꼼히 정리해 보세요. (⚠️ 복사 붙여넣기 금지 ⚠️)
    
    이번 챕터에서는 개념 정리를 제공하지 않았습니다. 앞으로의 개발 과정에서 필요한 내용을 직접 찾아보고 기록하는 습관을 기르는 것이 중요하기 때문입니다. 스스로 공식문서 위주로 탐색하시며 워크북의 내용을 작성해 보시는 것을 추천드립니다.
    
    혹시 막막하시다면, 아래 미션 강의 영상을 보며 실습 순서에 맞춰 따라 해 보시기를 바랍니다! 영상 속 단계별 설명과 함께 정리하시면 이해가 훨씬 수월할 것입니다!
    
    </aside>
    
    [Getting Started | Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
    
    - redux-toolkit과 redux의 차이 (왜 **`redux-toolkit`**을 더 많이 활용하나요?)
        
        
        |  | redux | redux-toolkit |
        | --- | --- | --- |
        | 설치 구성 | 수동으로 여러 패키지 설정 필요 | 자동 설정 |
        | 코드량 | 보일러플레이트 코드 많음 | 코드가 간결하고 구조적 |
        | 액션 정의 | 직접 `type` 문자열, `action creator` 따로 작성 | 자동 생성 (slice 기반) |
        | 상태 불변성 | 직접 `...spread` 등으로 처리 | `Immer` 내장으로 자동 처리 가능 |
    - redux-toolkit 사용법 (자세하게)
        - Provider
            - Redux Store를 React 애플리케이션 전체에 주입해주는 컴포넌트.
            - 모든 하위 컴포넌트에서 `useSelector`와 `useDispatch`를 사용할 수 있게 만듦.
            
            ```jsx
            import React from 'react';
            import ReactDOM from 'react-dom';
            import { Provider } from 'react-redux';
            import App from './App';
            import store from './store'; // 나중에 정의할 store
            
            ReactDOM.render(
              <Provider store={store}>
                <App />
              </Provider>,
              document.getElementById('root')
            );
            ```
            
        - configureStore
            - Redux store를 만드는 함수로, Redux Toolkit이 제공하는 간편한 설정 함수.
            - Redux 기본 설정(예: thunk 미들웨어, DevTools 연동)이 이미 내장돼 있어서 직접 설정할 필요가 없음.
            
            ```jsx
            import { configureStore } from '@reduxjs/toolkit';
            import counterReducer from './features/counterSlice';
            
            const store = configureStore({
              reducer: {
                counter: counterReducer,
              },
            });
            
            export type RootState = ReturnType<typeof store.getState>;
            export type AppDispatch = typeof store.dispatch;
            
            export default store;
            ```
            
        - createSlice
            - Redux의 Action + Reducer를 한 번에 정의할 수 있게 해주는 함수.
            - 자동으로 액션 생성 함수(`actions`)와 리듀서(`reducer`)를 만들어줌.
            
            ```jsx
            import { createSlice } from '@reduxjs/toolkit';
            
            interface CounterState {
              value: number;
            }
            
            const initialState: CounterState = {
              value: 0,
            };
            
            const counterSlice = createSlice({
              name: 'counter',
              initialState,
              reducers: {
                increment(state) {
                  state.value += 1;
                },
                decrement(state) {
                  state.value -= 1;
                },
                incrementByAmount(state, action) {
                  state.value += action.payload;
                },
              },
            });
            
            export const { increment, decrement, incrementByAmount } = counterSlice.actions;
            export default counterSlice.reducer;
            ```
            
        - useSelector
            - Redux Store에서 특정 state 값을 읽어오는 React Hook.
            - 컴포넌트에서 상태를 사용할 수 있게 함.
            
            ```jsx
            import React from 'react';
            import { useSelector } from 'react-redux';
            import type { RootState } from './store';
            
            const Counter = () => {
              const count = useSelector((state: RootState) => state.counter.value);
            
              return <div>Count: {count}</div>;
            };
            ```
            
        - useDispatch
            - 컴포넌트에서 Redux 액션을 전송(dispatch) 하기 위한 Hook.
            - 리듀서를 통해 상태를 변경할 수 있음.
            
            ```jsx
            import React from 'react';
            import { useDispatch } from 'react-redux';
            import { increment, decrement, incrementByAmount } from './features/counterSlice';
            import type { AppDispatch } from './store';
            
            const CounterButtons = () => {
              const dispatch = useDispatch<AppDispatch>();
            
              return (
                <div>
                  <button onClick={() => dispatch(increment())}>+1</button>
                  <button onClick={() => dispatch(decrement())}>-1</button>
                  <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
                </div>
              );
            };
            ```
            
        - 기타 redux-toolkit 사용 방법을 상세하게 정리해 보세요
            - createAsyncThunk
            - API 호출 같은 비동기 작업을 간편하게 처리할 수 있는 Redux Toolkit의 유틸리티.
            - `pending`, `fulfilled`, `rejected` 상태 자동 처리.
            - extraReducer
            - `createSlice`에서 비동기 작업(createAsyncThunk) 결과에 따른 상태를 업데이트할 때 사용.
            - 직접 액션 이름을 다루는 대신 builder 방식으로 작성.
- **`Zustand`** 🍠
  https://youtu.be/NOdAIlFreOI?si=958aros8pbEXNVsJ
    <aside>
    🍠
    
    위의 영상을 보고 **`Zustand`**에 대해 정리해주세요!
    
    또한 아래 공식문서 또한 읽어보시면서 부족한 내용을 보충해서 정리해주세요!
    
    https://zustand-demo.pmnd.rs/
    
    </aside>
    
    - **`Zustand`**에 대하여 정리해주세요! 🍠
        - 독일어로 "상태(state)"를 뜻.
        - React 앱에서 간단하고 직관적으로 전역 상태 관리를 할 수 있게 해주는 경량 상태 관리 라이브러리임.
        - Redux나 MobX보다 훨씬 가볍고, 보일러플레이트가 거의 없음.
