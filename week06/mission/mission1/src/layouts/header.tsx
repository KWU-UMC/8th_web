import { useSidebar } from "../contexts/sidebar";

export default function Header() {
  const { setIsOpen } = useSidebar();

  const onClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full h-10 bg-amber-400 fixed top-0">
      dfs
      <button onClick={onClick}>sidebarsidebar</button>
    </div>
  );
}
