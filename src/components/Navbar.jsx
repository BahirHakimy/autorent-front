import { AiOutlineUserAdd } from 'react-icons/ai';
import { FaSignInAlt } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Navbar() {
  const { user } = useSelector((state) => state.user);

  return (
    <nav className="bg-blue-500 sticky top-0">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-stretch justify-start">
            <div className="flex flex-shrink-0 items-start">
              <h1 className="font-semibold text-2xl drop-shadow font-[cursive] text-white">
                AutoRent
              </h1>
            </div>
          </div>
          <Link
            to={user ? '/dashboard' : '/login'}
            className="font-semibold bg-slate-50 text-blue-500 px-4 py-2 rounded selection:antialiased"
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
