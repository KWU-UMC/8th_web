import { FaShoppingCart } from "react-icons/fa"
import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { useEffect } from "react";
import { calculateTotals } from "../slices/cartSlice";

const Navbar = () => {
  const {amount,cartItems}=useSelector((state)=>state.cart);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(calculateTotals());
  },[dispatch,cartItems]);
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