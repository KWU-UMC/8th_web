import { useSelector } from "react-redux";
import Modal from "./components/Modal";
import Home from "./pages/Home";
import type { RootState } from "./app/store";

function App() {
  const { isOpen } = useSelector((state: RootState) => state.modal);

  return (
    <>
      <Home />
      {isOpen && <Modal />}
    </>
  );
}

export default App;
