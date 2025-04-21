import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router-dom";
import Header from "./layouts/header";
import Sidebar from "./layouts/sidebar";
import { useSidebar } from "./contexts/sidebar";

const queryClient = new QueryClient();

function App() {
  const { isOpen } = useSidebar();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <div className="mt-10 flex">
        <Sidebar />
        <div className={`w-full bg-red-300 ${isOpen ? "ml-50" : ""}`}>
          <Outlet />
        </div>
      </div>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
