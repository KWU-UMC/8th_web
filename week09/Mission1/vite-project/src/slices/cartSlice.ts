import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItems } from "../types/cart";
import cartItems from "../constants/cartItems";

export interface CartState{
    cartItems: CartItems;
    amount: number;
    total: number;
}
const calculateInitialTotals = (items: CartItems) => {
  let amount = 0;
  let total = 0;
  items.forEach(item => {
    amount += item.amount;
    total += Number(item.price) * item.amount;
  });
  return { amount, total };
};

const { amount, total } = calculateInitialTotals(cartItems);

const initialState: CartState = {
    cartItems: cartItems,
    amount,
    total,
};

//cartSlice 생성
//createSlice- > reauxToolkit 에서 제공해줌
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        //TODO: 증가
        increment: (state, action: PayloadAction<{id:string}>) => {
        // action.payload = lp id
        const item = state.cartItems.find((cartItem) => cartItem.id === action.payload.id);
        if (item) {
            item.amount++;
        }
            cartSlice.caseReducers.calculateTotals(state);
        },

        //TODO: 감소
        decrement: (state, action: PayloadAction<{id:string}>) => {
        const item = state.cartItems.find((cartItem) => cartItem.id === action.payload.id);
            if (item && item.amount > 0) {
                item.amount--;
            // // amount가 0이면 리스트에서 제거
            // if (item.amount === 0) {
            //     state.cartItems = state.cartItems.filter((cartItem) => cartItem.amount > 0);
            // }
        }
            cartSlice.caseReducers.calculateTotals(state);
        },
        //TODO: remove 아이템 제거 (수량이 0이 되면 list에서 보여지지 않도록)
        removeItem: (state, action: PayloadAction<{id:string}>) => {
            state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== action.payload.id);
            cartSlice.caseReducers.calculateTotals(state);
        },
        
        //TODO: 전체  장바구니 삭제 버튼 만들기
        clearCart: (state) => {
            state.cartItems = [];
            state.amount = 0;
            state.total = 0;
        },
        //TODO : 총액 계산
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.price * item.amount; // price가 string일 경우 Number로 변환
            });
            state.amount = amount;
            state.total = total;
        },
    },
});

export const{increment, decrement, removeItem, clearCart, calculateTotals} = cartSlice.actions;
//duck pattern rudeucer는 export dfualt로 내보내야함
const cartReducer = cartSlice.reducer;

export default cartReducer;