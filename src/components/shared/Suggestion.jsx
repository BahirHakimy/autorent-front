/* eslint-disable react/prop-types */
import { FaSearch } from 'react-icons/fa';
import { AiOutlineLoading } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
  reset,
  search,
  searchLocation,
  setDropoff,
  setPickup,
} from '../../context/features/locationSlice';
import { useRef } from 'react';

function Suggestion({ id, label }) {
  const { results, loading } = useSelector((state) => state.location);
  const dispatch = useDispatch();
  const ref = useRef();

  const handleChange = (event) => {
    dispatch(search(event.target.value));
  };

  const handleSearch = () => {
    dispatch(searchLocation());
  };

  const handleClick = (address) => {
    const coords = { lat: address.lat, lon: address.lon };
    id === 'pickup'
      ? dispatch(setPickup(coords))
      : dispatch(setDropoff(coords));
    ref.current.value = address.display_name;
    dispatch(reset());
  };

  return (
    <div className="relative w-full lg:w-auto my-1 pl-2 lg:pl-0">
      <div className="flex min-h-[48px] lg:min-h-[64px] justify-start items-center max-w-full bg-white rounded-md px-2">
        <div className="relative flex flex-col justify-start items-start p-2 w-full">
          <input
            className="w-full peer text-lg outline-none truncate"
            type="text"
            id={id}
            name={id}
            onChange={handleChange}
            ref={ref}
          />
          <label
            className={`absolute transition peer-focus:-translate-x-4 peer-focus:-translate-y-5 peer-focus:scale-75 ${
              ref.current?.value ? '-translate-x-4 -translate-y-5 scale-75' : ''
            }`}
            htmlFor={id}
          >
            {label}
          </label>
        </div>
        <div
          className="h-full flex-1 hover:bg-slate-200 p-2 active:scale-110"
          onClick={handleSearch}
        >
          <FaSearch />
        </div>
      </div>
      <ul className="absolute flex flex-col mt-2 bg-blue-500 w-full rounded-md overflow-hidden">
        {loading ? (
          <div className="w-full flex justify-center">
            <AiOutlineLoading size={24} className="animate-spin text-white" />
          </div>
        ) : (
          results.map((address) => (
            <li
              key={address?.place_id}
              onClick={() => handleClick(address)}
              className="w-full p-2 bg-blue-500 text-white hover:bg-blue-600 truncate cursor-pointer"
            >
              {address?.display_name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Suggestion;
