import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "../features/cartSlice.ts";
import modalReducer from "../features/modalSlice.ts";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        modal: modalReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
