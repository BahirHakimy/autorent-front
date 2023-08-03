// import React from 'react';
import { Map } from './map';
import { useSelector } from 'react-redux';
import SearchBar from './home/SearchBar';

function HomePage() {
  const { pickup, distance } = useSelector((state) => state.search.locations);

  return (
    <div className="flex flex-col">
      <h1 className="w-full text-center text-blue500 my-4 text-3xl font-semibold text-blue-500">
        Let&apos;s find you a car, just a few clicks :)
      </h1>
      <SearchBar />
      <div className="z-0 relative md:p-4 lg:p-8">
        {pickup.lat && (
          <div className="">
            <h3 className="text-xl font-semibold my-2 text-slate-500">
              See on the map{' '}
              {distance > 0 && (
                <span className="text-slate-800 rounded">
                  ({distance.toFixed(2)} KM)
                </span>
              )}
            </h3>
            <Map />
          </div>
        )}
      </div>{' '}
    </div>
  );
}

export default HomePage;
