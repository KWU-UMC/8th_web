import type {StateCreator} from "zustand/vanilla";
import type {ZustandStore} from "../../app/storeZustand.ts";
import type {ReactNode} from "react";

export interface ZustandModalSlice {
    isModalOpen: boolean;
    modalContent: ReactNode | null;
    openModal: (node: ReactNode) => void;
    closeModal: () => void;
}

export const createZustandModalSlice: StateCreator<
    ZustandStore,
    [],
    [],
    ZustandModalSlice
> = (set): ZustandModalSlice => ({
    isModalOpen: false,
    modalContent: null,
    openModal: (node: ReactNode) => set((state) => ({...state, isModalOpen: true, modalContent: node})),
    closeModal: () => set((state) => ({...state, isModalOpen: false})),
});
