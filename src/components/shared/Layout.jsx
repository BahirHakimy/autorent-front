import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from '.';
import { AuthNavbar } from '../admin/auth';
import Navbar from '../admin/Navbar';

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
