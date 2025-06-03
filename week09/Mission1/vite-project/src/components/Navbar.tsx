import { FaShoppingCart } from "react-icons/fa";
//import { useSelector } from "../hooks/useCustomRedux";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";
import { useEffect } from "react";

const Navbar = () => {
    const {amount, cartItems} = useCartInfo();
    const {calculateTotals} = useCartActions();

    //const {amount} = useSelector((state) => state.cart);
    useEffect(() => {
        calculateTotals();
    }, [cartItems, calculateTotals]);

    return <div 
    className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-2xl font-semibold"> Soda</h1>
        <div className="flex items-center space-x-2">
            <FaShoppingCart className="text-2xl"/>
            <span className="text-2xl font-medium">
                {amount}
            </span>
        </div>
    </div>
};
export default Navbar;