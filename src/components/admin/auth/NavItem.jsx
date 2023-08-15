/* eslint-disable react/prop-types */
import { NavLink, useLocation } from 'react-router-dom';

function NavItem({ to, label, Icon }) {
  const { pathname } = useLocation();
  let match = pathname.includes(to);

  return (
    <li
      className={`flex flex-col relative ${
        match
          ? "before:content-[''] before:self-end before:w-6 before:h-4 before:bg-slate-50 after:content-[''] after:self-end after:w-6 after:h-4 after:bg-slate-50"
          : ''
      }`}
    >
      {match && (
        <div className="w-6 h-4 bg-cyan-600 self-end absolute rounded-br-xl " />
      )}
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${
            isActive
              ? 'rounded-l-full text-cyan-900 bg-slate-50'
              : 'bg-cyan-600  text-slate-50 hover:bg-cyan-500'
          } p-3 flex md:space-x-4 items-center font-medium antialiased`
        }
      >
        <Icon size={18} />
        <span className="hidden md:block whitespace-nowrap">{label}</span>
      </NavLink>
      {match && (
        <div className="w-6 h-4 bg-cyan-600 self-end absolute bottom-0 rounded-tr-xl " />
      )}
    </li>
  );
}

export default NavItem;
