- Props-Drilling은 무엇인가요?
  상위 컴포넌트가 하위 컴포넌트에게 props를 전달하고 또 그 과정이 반복되는 것을 말함. 계층이 깊어질수록 복잡해진다.
- 이를 어떻게 해결할 수 있을까요?
  context를 사용하거나 recoil, redux 같은 상태관리 라이브러리를 사용

- **`useReducer`** 에 대하여 정리해주세요! 🍠
  useState와 비슷하게 동작하나 useState보다 복잡하고 상태 값이 많은 상태를 관리해야할 때 사용합니다. useState는 value와 그 value를 변경해주는 set함수로 구성이 되는데 useReducer는 value와 그 값을 수정해주는 dispatch(action) 그리고 상태를 어떻게 변경할지를 정의하는 함수인 reducer로 구성됩니다.

- Provider
  우리가 context를 사용할 때 contextProvider를 App에 감싸는 것처럼 같은 동작을 함
  ```jsx
  <Provider store={store}>
    <App />
  </Provider>
  ```
- configureStore
  ```jsx
  const store = configureStore({
    reducer: {
      counter: counterReducer,
    },
  });
  ```
- createSlice
  ```jsx
  const couterSlice = createSlice({
    name: "counter",
    initialState: { value: 0 },
    reducers: {
      increment: (state) => {
        state.value += 1;
      },
      decrement: (state) => {
        state.value -= 1;
      },
    },
  });
  ```
- useSelector
  Redux state를 읽어오기 위한 hook
  ```jsx
  const count = useSelector((state) => state.counter.value);
  ```
- useDispatch
  state 변경 함수를 실행하기 위한 hook

  ```jsx
  const dispatch = useDispatch();

  <button onClick={() => dispatch(increment())}>+1</button>;
  ```

Zustand에 대하여 정리해주세요!

```jsx
import { create } from 'zustand'

type Store = {
	count: number;
	inc: () => void
}

const useStore = create<Store>()((set) => ({
	count: 1,
	inc: () => set((state) => ({count: state.count + 1})),
}))

function Counter() {
	const { count, inc } = useStore()
	return (
		<div>
			<span>{count}</span>
			<button onClick={inc}>+1</button>
		</div>
	)
}
```
