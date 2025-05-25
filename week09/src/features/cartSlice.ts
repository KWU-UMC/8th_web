import type {PlaylistItem} from "../type/PlaylistItem.ts";
import {createSlice} from "@reduxjs/toolkit";
import cartItems from "../assets/cartItems.ts";

export interface CartState {
    items: PlaylistItem[],
    totalPrice: number,
}

const calculateTotalPrice = (items: PlaylistItem[]) => {
    return items.reduce((acc, item) => acc + item.amount * item.price, 0)
}

const initialState: CartState = {
    items: cartItems,
    totalPrice: calculateTotalPrice(cartItems),
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            state.items.push(action.payload)
        },
        removeCartItem: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id)
            if (index !== -1) {
                state.items.splice(index, 1)
            }
        },
        addCartItemAmount: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id)
            if (index !== -1) {
                state.items[index].amount += 1
            }
        },
        removeCartItemAmount: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id)
            if (index !== -1) {
                state.items[index].amount -= 1
            }
        },
        clearCartItems: (state) => {
            state.items = []
        },
        calculateCartTotalPrice: (state) => {
            state.totalPrice = calculateTotalPrice(state.items)
        }
    }
})

export const {
    addCartItem,
    removeCartItem,
    addCartItemAmount,
    removeCartItemAmount,
    clearCartItems,
    calculateCartTotalPrice
} = cartSlice.actions

export default cartSlice.reducer
