import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router-dom";
import Header from "./layouts/header";
import Sidebar from "./layouts/sidebar";
import { useSidebar } from "./contexts/sidebar";
import { useRef } from "react";

const queryClient = new QueryClient();

function App() {
  const { isOpen, setIsOpen } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleCloseSidebar = (e: React.MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 1000) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <div className="mt-15 flex">
        <Sidebar ref={sidebarRef} />
        <div
          onClick={handleCloseSidebar}
          className={`w-full min-h-screen bg-red-300 ${isOpen ? "ml-50" : ""}`}
        >
          <Outlet />
        </div>
      </div>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
