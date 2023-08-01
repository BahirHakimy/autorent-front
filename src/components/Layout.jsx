import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import { AuthNavbar } from './auth';
import { ToastContainer } from './shared';

function Layout() {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex justify-start items-center">
      <ToastContainer />

      {user ? <AuthNavbar /> : <Navbar />}
      <Outlet />
    </div>
  );
}

export default Layout;
