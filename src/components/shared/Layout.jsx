/* eslint-disable react/prop-types */
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from '.';
import { AuthNavbar } from '../admin/auth';
import Navbar from '../admin/Navbar';
import { useEffect } from 'react';
import { axios } from '../../utils/api';
import { getUser } from '../../utils/auth';

function Layout({ AuthNav = AuthNavbar }) {
  const { user } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname.includes('admin')) {
      axios(getUser(false))
        .get('users/check_admin/')
        .then((response) => {
          if (response.status === 403 || !response.data?.isAdmin) {
            navigate('/dashboard');
          }
        });
    }
  }, [navigate, pathname]);

  return (
    <div className="flex justify-start items-center">
      <ToastContainer />

      {user ? <AuthNav /> : <Navbar />}
      <Outlet />
    </div>
  );
}

export default Layout;
