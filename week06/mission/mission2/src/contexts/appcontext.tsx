import { ReactNode } from "react";
import { SidebarProvider } from "./sidebar";
import { AuthProvider } from "./authcontext";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </AuthProvider>
    </>
  );
}
