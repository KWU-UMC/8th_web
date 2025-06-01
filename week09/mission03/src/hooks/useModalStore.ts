// ✅ hooks/useModalStore.ts (Zustand 기반 모달 상태)
import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
