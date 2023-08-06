// import React from 'react';
import { Map } from './map';
import { useSelector } from 'react-redux';
import SearchBar from './home/SearchBar';
import { Loading } from './shared';
import Navbar from './Navbar';

function HomePage() {
  const { pickup, distance } = useSelector((state) => state.search.locations);
  const { loading, availableCars } = useSelector((state) => state.car);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div
        className={`w-full h-screen ${`bg-[url('https://static.bnr.bg/gallery/cr/da98ab795a90aeb6c218ae5548982be5.jpg')]`} bg-cover bg-center`}
      >
        <div className="w-full h-full bg-[rgba(0_0_50/0.4)] flex justify-center max-h-screen overflow-auto">
          <div className="flex flex-col  max-w-screen-xl w-full">
            <h1 className="w-full text-center text-blue500 text-3xl my-6 font-semibold text-white">
              Let&apos;s find you a car, just a few clicks :)
            </h1>
            <SearchBar />
            {loading ? (
              <Loading />
            ) : availableCars.length ? (
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
              <div className="z-0 relative my-2 md:p-4 lg:p-8">
                {pickup.lat && (
                  <div className="">
                    <h3 className="text-xl font-semibold my-2 text-white">
                      See on the map{' '}
                      {distance > 0 && (
                        <span className="text-slate-100 rounded">
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
        </div>
      </div>
    </div>
  );
}

export default HomePage;
