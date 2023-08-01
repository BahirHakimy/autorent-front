import React from 'react';
import { FaSearch } from 'react-icons/fa';

function HomePage() {
  const now = new Date();
  return (
    <div className="flex flex-col justify-center items-center mx-auto p-4 max-w-screen-xl h-screen">
      <nav className="w-full bg-blue-600 rounded-md flex justify-center py-2">
        <h1 className="text-3xl font-bold text-white">
          Let's find you a car, just a few clicks :)
        </h1>
      </nav>
      <div className="flex justify-start items-start w-full p-4 rounded-md bg-slate-100 shadow-md m-2 h-full">
        <div className="flex flex-wrap w-full bg-sky-500 rounded-md">
          <div className="flex flex-col w-full md:w-1/3 p-2 mt-2">
            <label className="text-white font-semibold" htmlFor="pickup">
              Where you want to get the car?
            </label>
            <input
              className="bg-white w-full py-1 rounded px-2 rounded-l-md"
              type="text"
              name="pickup"
              id="pickup"
              placeholder="Pickup location"
            />
            <div className="flex items-center text-white font-semibold py-2">
              <button className="bg-white px-3 py-1 rounded-md shadow-md active:shadow-inner text-sky-500">
                Pick it on map
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/3 p-2 mt-2">
            <label className="text-white font-semibold" htmlFor="drop-off">
              Where should we get it back?
            </label>
            <input
              className="bg-white w-full py-1 rounded px-2 rounded-l-md"
              type="text"
              name="drop-off"
              id="drop-off"
              placeholder="Drop off location"
            />
            <div className="flex items-center text-white font-semibold py-2">
              <button className="bg-white px-3 py-1 rounded-md shadow-md active:shadow-inner text-sky-500">
                Pick it on map
              </button>
            </div>
          </div>
          <div className="flex items-end w-1/3 mt-1">
            <div className="flex flex-col w-full p-2 md:max-w-[10rem]">
              <p className="text-white font-semibold">When?</p>
              <div className="flex flex-col">
                <input
                  className="bg-white px-3 w-full py-1 rounded my-1"
                  type="date"
                  name="pickup_date"
                  id="pickup_date"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                />
                <input
                  className="bg-white px-3 w-full py-1 rounded my-1"
                  type="time"
                  name="pickup_time"
                  id="pickup_time"
                  defaultValue={`${now.getHours()}:${now.getMinutes()}`}
                />
              </div>
            </div>
            <div className="flex flex-col w-full p-2 md:max-w-[10rem]">
              <p className="text-white font-semibold">Until?</p>
              <div className="flex flex-col">
                <input
                  className="bg-white px-3 w-full py-1 rounded my-1"
                  type="date"
                  name="drop_off_date"
                  id="drop_off_date"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                />
                <input
                  className="bg-white px-3 w-full py-1 rounded my-1"
                  type="time"
                  name="drop_off_time"
                  id="drop_off_time"
                  defaultValue={`${now.getHours()}:${now.getMinutes()}`}
                />
              </div>
            </div>
            <button className="bg-blue-500 p-2 mb-3 py-6 rounded-md text-white font-semibold">
              Search
            </button>
          </div>
        </div>
        {/* <div className="inline-flex flex-col justify-center relative text-gray-500">
          <div className="relative flex items-center">
          <input
          type="text"
              className="p-2 pl-8 rounded border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
              placeholder="search..."
              value="Gar"
            />
          </div>
          <ul className="bg-white border border-gray-100 w-full mt-2">
            <li className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
              <b>Gar</b>dameer - Italië
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}

export default HomePage;
