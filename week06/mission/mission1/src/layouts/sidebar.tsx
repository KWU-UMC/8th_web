import { useSidebar } from "../contexts/sidebar";

export default function Sidebar() {
  const { isOpen } = useSidebar();

  return (
    <div
      className={`w-50 fixed left-0 h-screen bg-black transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      sidebar
    </div>
  );
}
