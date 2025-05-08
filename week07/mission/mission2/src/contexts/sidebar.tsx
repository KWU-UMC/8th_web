import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface SidebarContextI {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextI | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  return (
    <SidebarContext.Provider
      value={{ isOpen, setIsOpen, isDeleteModalOpen, setIsDeleteModalOpen }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextI => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within an SidebarProvider");
  }
  return context;
};
