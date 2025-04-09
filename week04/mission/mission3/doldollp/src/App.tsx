import "./App.css";
import Navigation from "./layout/navigation";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default App;
