import { useCartStore } from '../store/useCartStore';
import { useModalStore } from '../store/useModalStore';

const PriceBox = () => {
  const { total } = useCartStore();
  const openModal = useModalStore((state) => state.openModal);

  return (
    <div className="p-12 flex justify-between">
      <button onClick={openModal} className="border p-4 rounded-md">
        전체 삭제
      </button>
      <div>총 가격: {total}원</div>
    </div>
  );
};

export default PriceBox;
