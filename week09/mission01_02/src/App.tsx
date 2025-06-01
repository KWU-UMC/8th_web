import { Provider } from "react-redux";
import "./App.css";
import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import store from "./store/store";
import PriceBox from "./components/PriceBox";
import Modal from "./components/Modal";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <CartList />
      <PriceBox />
      <Modal /> {/* ✅ 항상 렌더링되지만 내부에서 isOpen일 때만 보임 */}
    </Provider>
  );
}
//Provider로 App에 Store 주입
//이걸로 REACT 전역에서 Redux를 상태를 사용할수 있게 됨.

export default App;
