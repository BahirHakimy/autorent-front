// import React from 'react';
import { Map } from './map';
import { useSelector } from 'react-redux';
import SearchBar from './home/SearchBar';
import { Loading } from './shared';
import Navbar from './Navbar';

function HomePage() {
  const { pickup, distance } = useSelector((state) => state.search.locations);
  const { loading } = useSelector((state) => state.car);

  return (
    <div className="flex flex-col max-h-screen overflow-hidden">
      <Navbar />
      <div
        className={`w-full h-full ${`bg-[url('https://static.bnr.bg/gallery/cr/da98ab795a90aeb6c218ae5548982be5.jpg')]`} bg-cover bg-center overflow-auto`}
      >
        <div className="w-full h-full bg-[rgba(0_0_50/0.4)] flex justify-center ">
          <div className="flex flex-col  max-w-screen-xl w-full">
            <h1 className="w-full text-center text-blue500 text-3xl my-6 font-semibold text-white">
              Let&apos;s find you a car, just a few clicks :)
            </h1>
            <SearchBar />
            {loading ? (
              <Loading />
            ) : (
              <div className="z-0 relative mb-4 md:p-4 lg:p-8">
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
