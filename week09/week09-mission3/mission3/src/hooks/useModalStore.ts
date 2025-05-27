import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  type: string | null;
  actions: {
    openModal: (type: string) => void;
    closeModal: () => void;
  };
}

const useModalStore = create<ModalState>()((set) => ({
  isOpen: false,
  type: null,
  actions: {
    openModal: (type: string) => set({ isOpen: true, type }),
    closeModal: () => set({ isOpen: false, type: null }),
  },
}));

export const useModalInfo = () => {
  return useModalStore((state) => ({
    isOpen: state.isOpen,
    type: state.type,
  }));
};

export const useModalActions = () => {
  return useModalStore((state) => state.actions);
};

export default useModalStore; 