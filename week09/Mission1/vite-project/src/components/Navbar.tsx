import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "../hooks/useCustomRedux";

const Navbar = () => {
    const {amount} = useSelector((state) => state.cart);
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