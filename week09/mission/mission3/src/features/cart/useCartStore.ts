import { create } from "zustand";
import cartItems from "../../constants/cartItems";
import type { itemProps } from "../../types/itemProps";
import type { cartProps } from "../../types/cartProps";

interface CartState extends cartProps {
  increment: (item: itemProps) => void;
  decrement: (item: itemProps) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

const useCartStore = create<CartState>((set, get) => ({
  items: cartItems,
  total: 0,
  increment: (itemToAdd) =>
    set((state) => {
      const item = state.items.find((item) => item.id === itemToAdd.id);
      if (item) {
        item.amount += 1;
      }
      return { items: [...state.items] };
    }),
  decrement: (itemToDecrement) =>
    set((state) => {
      const item = state.items.find((item) => item.id === itemToDecrement.id);
      if (item) {
        if (item.amount === 1) {
          const idx = state.items.findIndex((i) => i.id === itemToDecrement.id);
          state.items.splice(idx, 1);
        } else {
          item.amount -= 1;
        }
      }
      return { items: [...state.items] };
    }),
  clearCart: () => set({ items: [], total: 0 }),
  calculateTotals: () =>
    set((state) => ({
      total: state.items.reduce(
        (sum, item) => sum + Number(item.price) * item.amount,
        0
      ),
    })),
}));

export default useCartStore;
