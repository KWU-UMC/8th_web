import "./App.css";
import Navbar from "./components/Navbar";
import CartList from "./components/CartList";
import Modal from "./components/Modal"; // ✅ 모달도 꼭 포함시켜야 함

function App() {
  return (
    <>
      <Navbar />
      <CartList />
      <Modal /> {/* zustand 모달 상태에 따라 조건부 렌더링됨 */}
    </>
  );
}

export default App;
