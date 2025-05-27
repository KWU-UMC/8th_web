import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import cartItems from "../constants/cartItems";
import type { CartItems } from "../types/cart";
import { useShallow } from "zustand/react/shallow";

interface CartActions{
    increase: (id: string) => void;
    decrease: (id: string) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    calculateTotal: () => void;
}

interface CartState{
    cartItems: CartItems
    amount:number;
    total:number;

    actions: CartActions;

}

export const useCartStore=create<CartState>()(
    /*eslint-disable @typescript-eslint/no-unused-vars*/
    immer((set,_)=>({
    cartItems:cartItems,
    amount:0,
    total:0,
    actions:{
        increase:(id:string)=>{
            set((state)=>{
                const cartItem=state.cartItems.find(item=>item.id===id);
                if(cartItem){
                    cartItem.amount++;
                }
            })
        },
        decrease:(id:string)=>{
            set((state)=>{
                const cartItem=state.cartItems.find(item=>item.id===id);
                if(cartItem&&cartItem.amount>0){
                    cartItem.amount--;
                }
            })
        },
        removeItem:(id:string)=>{
            set((state)=>{
                state.cartItems=state.cartItems.filter(item=>item.id!==id);
            })
        },
        clearCart:()=>{
            set((state)=>{
                state.cartItems=[]
            })
        },
        calculateTotal:()=>{
            set((state)=>{
                let amount=0;
                let total=0;
                state.cartItems.forEach(item=>{
                    amount+=item.amount;
                    total+=item.amount*item.price;
                })
                state.amount=amount;
                state.total=total;
            })
        },
    }
})));


export const useCartInfo=()=>{
    return useCartStore(
        useShallow((state)=>({
            cartItems:state.cartItems,
            amount:state.amount,
            total:state.total,
})))};

export const useCartActions=()=>{
    return useCartStore(useShallow((state)=>state.actions))};