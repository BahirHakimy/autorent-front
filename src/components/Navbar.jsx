import React from 'react';
import { FaBell } from 'react-icons/fa';
import Logo from '../assets/logo.png';

function Navbar(props) {
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
          <button className="font-semibold bg-slate-50 text-blue-500 px-4 py-2 rounded selection:antialiased">
            My Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
