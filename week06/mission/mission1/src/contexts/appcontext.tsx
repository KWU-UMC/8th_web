import { ReactNode } from "react";
import { SidebarProvider } from "./sidebar";

export default function AppProvider({ children }: { children: ReactNode }) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
