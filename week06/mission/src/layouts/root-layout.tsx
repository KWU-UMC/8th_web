import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const RootLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-16">
        <Navbar />
      </div>
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <div className="flex-1 p-6 min-h-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;