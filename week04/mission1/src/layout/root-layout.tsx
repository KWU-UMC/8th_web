import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RootLayout = () => {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith('/movies/detail/') && location.pathname.split('/').length === 4;

  return (
    <>
      {!isDetailPage && <Navbar />} 
      <Outlet />
    </>
  );
};

export default RootLayout;