import { create } from 'zustand';
import defaultItems from '../constants/cartItems';

export interface CartItem {
  id: string;
  title: string;
  singer: string;
  price: number;
  img: string;
  amount: number;
}

interface CartState {
  cartItems: CartItem[];
  amount: number;
  total: number;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: defaultItems,
  amount: 0,
  total: 0,

  increase: (id) =>
    set((state) => {
      const updated = state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );
      return { cartItems: updated };
    }),

  decrease: (id) =>
    set((state) => {
      const updated = state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount - 1 } : item
      );
      return { cartItems: updated };
    }),

  removeItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ cartItems: [] }),

  calculateTotals: () =>
    set((state) => {
      const amount = state.cartItems.reduce((sum, item) => sum + item.amount, 0);
      const total = state.cartItems.reduce((sum, item) => sum + item.amount * item.price, 0);
      return { amount, total };
    }),
}));
