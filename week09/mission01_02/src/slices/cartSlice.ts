import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";
import type { CartItems } from "../types/cart";

export interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 🔼 1. 수량 증가
    increase: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (item) {
        item.amount += 1;
      }
    },

    // 🔽 2. 수량 감소
    decrease: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (item && item.amount > 0) {
        item.amount -= 1;
      }
    },

    // ❌ 3. 특정 아이템 제거
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },

    // 🧹 4. 장바구니 비우기
    clearCart: (state) => {
      state.cartItems = [];
    },

    // 💰 5. 총 수량 & 총 가격 계산
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

// 액션 생성자와 리듀서 export
export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
