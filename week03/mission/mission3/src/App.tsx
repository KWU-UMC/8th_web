import { Outlet } from "react-router-dom";
import Navigation from "./layout/navigation";

function App() {
  return (
    <div className="w-full h-full">
      <Navigation />
      <Outlet />
    </div>
  );
}

export default App;
