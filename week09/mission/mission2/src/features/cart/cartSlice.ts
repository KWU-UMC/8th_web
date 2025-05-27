import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../../constants/cartItems";
import type { itemProps } from "../../types/itemProps";
import type { cartProps } from "../../types/cartProps";

const initialState: cartProps = { items: cartItems, total: 0 };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<itemProps>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.amount += 1;
      }
    },
    decrement: (state, action: PayloadAction<itemProps>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.amount === 1) {
          const idx = state.items.findIndex((i) => i.id === action.payload.id);
          state.items.splice(idx, 1);
        } else {
          item.amount -= 1;
        }
      }
    },
    clearCart: () => {
      return { items: [], total: 0 };
    },
    calculateTotals: (state) => {
      state.total = state.items.reduce(
        (sum, item) => sum + Number(item.price) * item.amount,
        0
      );
    },
  },
});

export const { increment, decrement, clearCart, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
