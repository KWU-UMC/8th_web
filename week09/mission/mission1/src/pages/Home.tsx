import Cart from "../components/Cart";
import Item from "../components/Item";
import cartItems from "../constants/cartItems";

export default function Home() {
  return (
    <>
      <div className="w-full mt-20 flex justify-center items-center flex-col gap-4">
        {cartItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <button className="my-20 p-4 border-1 border-black rounded-xl cursor-pointer">
          전체 삭제
        </button>
      </div>
      <Cart />
    </>
  );
}
