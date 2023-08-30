import { AiOutlineUserAdd } from 'react-icons/ai';
import { FaSignInAlt } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Logo from '../assets/logo-white.png';

function Navbar() {
  const { user } = useSelector((state) => state.user);
  return (
    <nav className="bg-blue-500 sticky z-50 h-[10vh] 2xl:h-[8vh] top-0">
      <div className="mx-auto h-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-full items-center justify-end md:justify-between">
          <div>
            <Link
              to="/"
              className="fixed md:hidden top-4 md:top-2 left-2 border shadow-md rounded-full"
            >
              <img src={Logo} alt="Logo" width="45px" height="45px" />
            </Link>
            <Link to="/" className="hidden md:flex w-full justify-center ">
              <img src={Logo} alt="Logo" width="100px" height="100px" />
            </Link>
          </div>
          <Link
            to={user?.is_admin ? '/admin' : user ? '/dashboard' : '/login'}
            className="font-semibold bg-slate-50 text-blue-500 px-4 md:ml-auto py-2 rounded selection:antialiased"
          >
            {user ? (
              <p className="flex items-center">
                <MdDashboard />
                <span className="md:block hidden">My Dashboard</span>
              </p>
            ) : (
              <p className="flex items-center">
                <FaSignInAlt />
                <span className="md:block hidden">Log in</span>
              </p>
            )}
          </Link>
          {!user && (
            <Link
              to="/signup"
              className="font-semibold mx-2 bg-slate-50 text-blue-500 px-4 py-2 rounded selection:antialiased"
            >
              <p className="flex items-center">
                <AiOutlineUserAdd />
                <span className="md:block hidden">Sign up</span>
              </p>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
