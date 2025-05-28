import type {PlaylistItem} from "../../type/PlaylistItem.ts";
import cartItems from "../../assets/cartItems.ts";
import type {StateCreator} from "zustand/vanilla";
import type {ZustandStore} from "../../app/storeZustand.ts";

export interface ZustandCartSlice {
    cartItems: PlaylistItem[],
    totalPrice: number,
    removeCartItem: (id: string) => void,
    addCartItemAmount: (id: string) => void,
    removeCartItemAmount: (id: string) => void,
    clearCartItems: () => void,
    calculateCartTotalPrice: () => void
}

const calculateTotalPrice = (items: PlaylistItem[]) => {
    return items.reduce((acc, item) => acc + item.amount * parseInt(item.price), 0)
}

export const createZustandCartSlice: StateCreator<
    ZustandStore,
    [],
    [],
    ZustandCartSlice
> = (set): ZustandCartSlice => ({
    cartItems: cartItems,
    totalPrice: calculateTotalPrice(cartItems),
    removeCartItem: (id: string) => {
        set((state) => ({
            cartItems: state.cartItems.filter(item => item.id !== id)
        }))
    },
    addCartItemAmount: (id: string) => {
        set((state) => ({
            cartItems: state.cartItems.map(item =>
                item.id === id ? {...item, amount: item.amount + 1} : item)
        }))
    },
    removeCartItemAmount: (id: string) => {
        set((state) => ({
            cartItems: state.cartItems.map(item =>
                item.id === id ? {...item, amount: item.amount - 1} : item)
        }))
    },
    clearCartItems: () => {
        set({cartItems: [], totalPrice: 0})
    },
    calculateCartTotalPrice: () => {
        set(state => ({
            totalPrice: calculateTotalPrice(state.cartItems)
        }))
    }
})
