/* eslint-disable react/prop-types */
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from '.';
import { AuthNavbar } from '../admin/auth';
import Navbar from '../admin/Navbar';

function Layout({ AuthNav = AuthNavbar }) {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="flex justify-start items-center">
      <ToastContainer />

      {user ? <AuthNav /> : <Navbar />}
      <Outlet />
    </div>
  );
}

export default Layout;
