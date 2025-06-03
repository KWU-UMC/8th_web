import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import modalReducer from "../slices/modalSlice";

//1. 저장소 생성
function createStore() {
    const store = configureStore({
        //2.리듀서 설정
        reducer: {
            cart: cartReducer,
            modal: modalReducer,
        },
    });

    return store;
}

//store 활용할 수 있ㄷ록 내보내야함
//여기서 실해해서 스토어를 빼줘야함
//singleton 패턴ㅇ임
const store = createStore();

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;