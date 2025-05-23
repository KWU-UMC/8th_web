import { create } from "zustand";
import type { modalProps } from "../../types/modalProps";

interface ModalState extends modalProps {
  openModal: () => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useModalStore;
