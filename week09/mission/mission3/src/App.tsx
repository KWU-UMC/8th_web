import Modal from "./components/Modal";
import Home from "./pages/Home";
import useModalStore from "./features/modal/useModalStore";

function App() {
  const { isOpen } = useModalStore();

  return (
    <>
      <Home />
      {isOpen && <Modal />}
    </>
  );
}

export default App;
