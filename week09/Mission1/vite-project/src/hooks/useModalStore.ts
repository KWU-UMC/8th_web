import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";

interface ModalActions {
    openModal: () => void;
    closeModal: () => void;
}

interface ModalState {
    isOpen: boolean;
    message: string;

    actions: ModalActions;
}

export const useModalStore = create<ModalState>()(
    /*eslint-disable @typescript-eslint/no-unused-vars*/
    immer((set, _) => ({
        isOpen: false,
        message: "",
        actions: {
            openModal: () => {
                set((state) => {
                    state.isOpen = true;
            state.message = "정말 삭제하시겠습니까?";
                })
            },
            closeModal: () => {
                set((state) => {
                    state.isOpen = false;
                    state.message = "";
                })
            },
        }
    }))
);

export const useModalInfo = () => useModalStore(
    useShallow((state) => ({
        isOpen: state.isOpen,
        message: state.message,
    }))
);

export const useModalActions = () => useModalStore((state) => 
    state.actions
);