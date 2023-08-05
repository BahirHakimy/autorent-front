// import React from 'react';
import { Map } from './map';
import { useSelector } from 'react-redux';
import SearchBar from './home/SearchBar';
import { Loading } from './shared';

function HomePage() {
  const { pickup, distance } = useSelector((state) => state.search.locations);
  const { loading, error, availableCars } = useSelector((state) => state.car);

  return (
    <div className="flex flex-col">
      <h1 className="w-full text-center text-blue500 my-4 text-3xl font-semibold text-blue-500">
        Let&apos;s find you a car, just a few clicks :)
      </h1>
      <SearchBar />
      {loading ? (
        <Loading />
      ) : availableCars ? (
        availableCars.map((car) => (
          <div
            key={car.id}
            className="flex flex-col justify-center items-center cursor-pointer hover:bg-slate-50"
          >
            <div
              className={`flex justify-center items-center overflow-visible rounded-full max-w-fit`}
            >
              <img
                src={car.image}
                width={500}
                height={500}
                alt={`${car.model}-image`}
              />
            </div>
            <h2 className="text-xl font-bold">{car.model}</h2>
            <p className="text-slate-400 my-2">••••••••••••••••</p>
            <p className="text-slate-400 max-w-[400px] text-center break-words">
              {car.description}
            </p>
          </div>
        ))
      ) : (
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
        </div>
      )}
    </div>
  );
}

export default HomePage;
