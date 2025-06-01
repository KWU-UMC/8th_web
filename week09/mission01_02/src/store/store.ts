import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import modalReducer from "../slices/modalSlice";

// 🧩 1. 저장소 생성 함수
function createStore() {
  const store = configureStore({
    // 🧠 2. 리듀서 설정
    reducer: {
      cart: cartReducer,
      modal: modalReducer,
    },
  });
  return store;
}

// 📦 store를 활용할 수 있도록 내보냄 (싱글톤 패턴)
const store = createStore();
export default store;

// 🧠 Redux 상태 타입 추론용 도구 제공
export type RootState = ReturnType<typeof store.getState>; // 전체 상태 타입 추론
export type AppDispatch = typeof store.dispatch; // dispatch 타입 추론
