/* eslint-disable react/prop-types */
import { FaSearch } from 'react-icons/fa';
import { AiOutlineLoading } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { setDropoff, setPickup } from '../../context/features/searchSlice';
import { useRef, useState } from 'react';
import axios from 'axios';

function Suggestion({ id, label, defaultValue = '' }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(defaultValue);

  const dispatch = useDispatch();
  const ref = useRef();

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSelect = (address) => {
    const coords = { lat: address.lat, lon: address.lon };
    id === 'pickup'
      ? dispatch(setPickup(coords))
      : dispatch(setDropoff(coords));
    setQuery(address.display_name);
    setResults([]);
  };

  const handleClick = () => {
    if (!query) {
      setResults([]);
    } else {
      setLoading(true);
      axios.get(`https://geocode.maps.co/search?q=${query}`).then(
        (response) => {
          setResults(response.data);
          setLoading(false);
        },
        () => {
          setLoading(false);
          setQuery('');
        }
      );
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="relative w-full lg:w-auto my-1">
      <div className="flex min-h-[56px] lg:min-h-[64px] justify-start items-center max-w-full bg-white rounded-md px-2">
        <div className="relative flex flex-col justify-start items-start p-2 w-full">
          <input
            className="w-full peer text-lg outline-none truncate"
            type="text"
            id={id}
            name={id}
            ref={ref}
            required
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <label
            className={`absolute transition peer-focus:-translate-x-4 peer-focus:-translate-y-5 peer-focus:scale-75 ${
              ref.current?.value || defaultValue
                ? '-translate-x-4 -translate-y-5 scale-75'
                : ''
            }`}
            htmlFor={id}
          >
            {label}
          </label>
        </div>
        <div
          className="h-full flex-1 hover:bg-slate-200 p-2 active:scale-110"
          onClick={handleClick}
        >
          <FaSearch />
        </div>
      </div>
      <ul className="absolute flex flex-col mt-2 bg-blue-400 shadow-md w-full rounded-md overflow-hidden z-10">
        {loading ? (
          <div className="w-full flex justify-center">
            <AiOutlineLoading size={24} className="animate-spin text-white" />
          </div>
        ) : (
          results.map((address) => (
            <li
              key={address?.place_id}
              onClick={() => handleSelect(address)}
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
