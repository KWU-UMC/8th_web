import { FaShoppingCart } from "react-icons/fa"
import { useEffect } from "react"; 
import { useCartActions, useCartInfo } from "../hooks/useCartStore";


const Navbar = () => {
  const {amount,cartItems}=useCartInfo();
  const {calculateTotal}=useCartActions();

  useEffect(()=>{
    calculateTotal();
  },[cartItems,calculateTotal]);
  return (
    <div className='flex justify-between items-center p-4 bg-gray-800 text-white'>
        <h1 onClick={():void=>{window.location.href='/'}} className='text-2xl font-semibold cursor-pointer'>UMC Playlistt</h1>
        <div className="flex items-center gap-2">
          <FaShoppingCart className="text-2xl"/>
          <span className="text-xl">{amount}</span>
        </div>
    </div>
  )
}

export default Navbar