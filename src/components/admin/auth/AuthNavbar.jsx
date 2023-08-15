import { Link, useNavigate } from 'react-router-dom';
import {
  FaFacebook,
  FaTwitter,
  FaGoogle,
  FaGithub,
  FaMedium,
  FaUser,
  FaPowerOff,
  FaUsers,
} from 'react-icons/fa';
import { AiFillCar, AiFillProfile } from 'react-icons/ai';
import { BsFillJournalBookmarkFill } from 'react-icons/bs';
import { MdPayments } from 'react-icons/md';
import { BiSolidDashboard } from 'react-icons/bi';
import Logo from '../../../assets/logo-white.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../context/features/userSlice';
import toast from 'react-hot-toast';
import NavItem from './NavItem';

function AuthNavbar() {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const links = [
    { to: 'dashboard', label: 'Dashboard', Icon: BiSolidDashboard },
    { to: 'users', label: 'Users', Icon: FaUsers },
    { to: 'cars', label: 'Cars', Icon: AiFillCar },
    { to: 'bookings', label: 'Bookings', Icon: BsFillJournalBookmarkFill },
    { to: 'reviews', label: 'Reviews', Icon: AiFillProfile },
    { to: 'payments', label: 'Payments', Icon: MdPayments },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    toast.success('Logged Out!');
  };
  return (
    <ul className="bg-cyan-600 w-12 md:w-52 h-screen">
      <li>
        <Link
          to="/cars"
          className="flex rounded-full mb-4 mt-2 md:my-2 h-12 w-12 md:h-auto md:w-full justify-center"
        >
          <img src={Logo} alt="Logo" className="w-12 h-auto md:w-32" />
        </Link>
      </li>
      <li
        title={user.fullname || user.email.split('@')[0]}
        className="text-slate-50 px-3 py-2 flex justify-between items-center text-xl w-full font-semibold"
      >
        <span className="hidden md:block capitalize">
          {user.fullname || user.email.split('@')[0]}
        </span>
        <FaUser />
      </li>

      {links.map((attrs) => (
        <NavItem key={attrs.label} {...attrs} />
      ))}
      <li
        onClick={handleLogout}
        className="rounded-tl-xl rounded-bl-xl text-slate-50 hover:bg-cyan-500 px-3 py-2 flex justify-between items-center text-xl w-full font-semibold cursor-pointer active:bg-sky-600"
      >
        <span className="hidden md:block"> Logout</span>
        <FaPowerOff />
      </li>
      <ul className="hidden md:flex justify-center items-center w-full my-4">
        <a
          href="https://www.twitter.com"
          className="mx-1 text-slate-50 hover:scale-150 hover:text-sky-400 transition-transform"
        >
          <FaTwitter />
        </a>
        <a
          href="https://www.facebook.com"
          className="mx-1 text-slate-50 hover:scale-150 hover:text-blue-500 transition-transform"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.google.com"
          className="mx-1 text-slate-50 hover:scale-150 hover:text-red-400 transition-transform"
        >
          <FaGoogle />
        </a>
        <a
          href="https://www.medium.com"
          className="mx-1 text-slate-50 hover:scale-150 hover:text-slate-900 transition-transform"
        >
          <FaMedium />
        </a>
        <a
          href="https://www.github.com"
          className="mx-1 text-slate-50 hover:scale-150 hover:text-black transition-transform"
        >
          <FaGithub />
        </a>
      </ul>
      <li className="text-slate-200 w-full text-center text-sm font-semibold mx-auto hidden md:block">
        &copy; 2023 @Netlinks
      </li>
    </ul>
  );
}

export default AuthNavbar;
