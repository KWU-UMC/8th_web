import { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCartInfo, useCartActions } from "../hooks/useCartStore";

const Navbar = () => {
  const { amount, cartItems } = useCartInfo();
  const { calculateTotals } = useCartActions();

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 text-white py-4 z-50 shadow">
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
        <h1
          onClick={() => (window.location.href = "/")}
          className="text-2xl font-semibold cursor-pointer hover:text-gray-300 transition-colors duration-200"
          title="홈으로 이동"
        >
          Simone Says
        </h1>
        <div className="flex items-center space-x-2">
          <FaShoppingCart className="text-2xl cursor-pointer" />
          <span className="text-xl font-medium">{amount}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
