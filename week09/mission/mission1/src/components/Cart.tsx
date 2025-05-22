import { FaShoppingCart } from "react-icons/fa";

export default function Cart() {
  return (
    <div className="w-15 h-10 fixed right-50 top-10 flex justify-center items-center gap-2">
      <FaShoppingCart size={24} color="#000" />
      <span className="text-xl">12</span>
    </div>
  );
}
