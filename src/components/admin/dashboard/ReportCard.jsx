/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';

function ReportCard({ title, subTitle, Icon, color, value, to }) {
  return (
    <Link
      to={to}
      className="bg-white w-56 2xl:w-80 2xl:h-48 h-40 p-3 rounded-xl text-center shadow-md m-3 hover:shadow-xl hover:scale-110 transition-transform cursor-pointer"
    >
      <div
        className={`'flex items-center font-bold 2xl:text-xl ',
    ${
      color === 'sky'
        ? 'text-sky-400'
        : color === 'violet'
        ? 'text-violet-400'
        : color === 'rose'
        ? 'text-rose-400'
        : 'text-green-400'
    }`}
      >
        <Icon size={30} />
        {title}
      </div>
      <p className="mt-4 text-lg md:text-3xl text-cyan-900 font-bold">
        {value}
      </p>
      <p className="mt-1 text-sm md:text-base text-cyan-900">{subTitle}</p>
    </Link>
  );
}

export default ReportCard;
