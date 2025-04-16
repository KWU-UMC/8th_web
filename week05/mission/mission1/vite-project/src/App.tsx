import { Outlet } from "react-router-dom";
import Header from "./layouts/header";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
