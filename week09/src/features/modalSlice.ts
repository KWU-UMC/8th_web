import {createSlice} from "@reduxjs/toolkit";
import type {ReactNode} from "react";

export type ModalState = {
    isOpen: boolean,
    content: ReactNode,
}

export const initialState: ModalState = {
    isOpen: false,
    content: null,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isOpen = true
            state.content = action.payload
        },
        closeModal: (state) => {
            state.isOpen = false
        }
    }
})

export const {
    openModal,
    closeModal,
} = modalSlice.actions

export default modalSlice.reducer
