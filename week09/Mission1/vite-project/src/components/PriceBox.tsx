//import { useSelector } from "../hooks/useCustomRedux";

import { useCartInfo } from "../hooks/useCartStore"

const PriceBox = () => {
  //const {total} = useSelector((state) => state.cart);
  const{total} = useCartInfo();  
  
  return (
    <div className='p-12 flex justify-end'>
      총 금액 : {total} 원
    </div>
  )
}

export default PriceBox
