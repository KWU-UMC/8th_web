import { createSlice } from "@reduxjs/toolkit";

export interface ModalState{
    isOpen: boolean;
    message: string;
}

const initialState: ModalState ={
    isOpen: false,
    message: "",
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
            state.message = "정말 삭제하시겠습니까?";
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.message = "";
        },
    },
});

export const{openModal, closeModal} = modalSlice.actions;

const modalReducer = modalSlice.reducer;

export default modalReducer;