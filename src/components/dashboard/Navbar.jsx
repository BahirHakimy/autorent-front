import { BsFillJournalBookmarkFill } from 'react-icons/bs';
import {
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaMedium,
  FaPowerOff,
  FaTwitter,
  FaUser,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../context/features/userSlice';
import toast from 'react-hot-toast';

function AuthNavbar() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const links = [
    {
      to: 'my-bookings',
      label: 'My Bookings',
      Icon: BsFillJournalBookmarkFill,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    toast('Logged out!');
  };
  return (
    <div className="flex flex-col justify-center md:justify-start items-center md:items-start ml-2 md:m-0 md:pl-4 border rounded-full md:rounded-none shadow-md py-4 md:border-r h-max md:h-screen md:min-w-[300px]">
      <Link
        to="/cars"
        className="fixed flex justify-center items-center md:hidden w-12 h-12 top-2 left-2 border shadow-md rounded-full"
      >
        <h1 className="font-semibold text-center text-2xl drop-shadow font-[cursive] text-blue-500">
          AR
        </h1>
      </Link>
      <Link
        to="/cars"
        className="hidden md:block w-full border shadow-md rounded"
      >
        <h1 className="font-semibold text-center w-full text-2xl drop-shadow font-[cursive] text-blue-500">
          AutoRent
        </h1>
      </Link>
      <Link
        to={'my-profile'}
        title={user.fullname || user.email.split('@')[0]}
        className="text-sky-600 px-3 py-2 flex justify-between items-center text-xl w-full font-semibold"
      >
        <span className="hidden md:block capitalize">
          {user.fullname || user.email.split('@')[0]}
        </span>
        <FaUser />
      </Link>
      <ul className="w-full">
        {links.map(({ to, label, Icon }) => (
          <li key={label}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'text-slate-800 hover:bg-slate-100 active:bg-slate-200'
                } flex justify-between items-center px-3 py-2 text-xl w-full font-semibold`
              }
            >
              <span className="hidden md:block whitespace-nowrap">{label}</span>
              <Icon />
            </NavLink>
          </li>
        ))}
      </ul>
      <div
        onClick={handleLogout}
        className="rounded-tl-xl rounded-bl-xl text-slate-700 px-3 py-2 flex justify-between items-center text-xl w-full font-semibold hover:bg-slate-100 cursor-pointer active:bg-slate-200"
      >
        <span className="hidden md:block"> Logout</span>
        <FaPowerOff />
      </div>
      <ul className="hidden md:flex justify-center items-center w-full mt-auto mb-4 pr-4">
        <a
          href="https://www.twitter.com"
          className="mx-1 text-slate-800 hover:scale-150 hover:text-sky-400 transition-transform"
        >
          <FaTwitter />
        </a>
        <a
          href="https://www.facebook.com"
          className="mx-1 text-slate-800 hover:scale-150 hover:text-blue-500 transition-transform"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.google.com"
          className="mx-1 text-slate-800 hover:scale-150 hover:text-red-400 transition-transform"
        >
          <FaGoogle />
        </a>
        <a
          href="https://www.medium.com"
          className="mx-1 text-slate-800 hover:scale-150 hover:text-slate-900 transition-transform"
        >
          <FaMedium />
        </a>
        <a
          href="https://www.github.com"
          className="mx-1 text-slate-800 hover:scale-150 hover:text-black transition-transform"
        >
          <FaGithub />
        </a>
      </ul>
      <p className="text-slate-700 text-sm font-semibold mx-auto pr-4 pb-6 hidden md:block">
        &copy; 2023 @Netlinks
      </p>
    </div>
  );
}

export default AuthNavbar;
