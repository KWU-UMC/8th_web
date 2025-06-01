import { useCartInfo } from "../hooks/useCartStore";
import { useModalStore } from "../hooks/useModalStore";

const PriceBox = () => {
  const { total } = useCartInfo();
  const { openModal } = useModalStore();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 z-10">
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
        <button
          onClick={openModal}
          className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-sm"
        >
          장바구니 초기화
        </button>
        <p className="text-xl font-semibold">
          총 결제 금액: {total.toLocaleString()} won
        </p>
      </div>
    </div>
  );
};

export default PriceBox;
