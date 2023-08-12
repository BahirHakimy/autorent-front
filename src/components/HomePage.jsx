// import React from 'react';
import { Map } from './map';
import { useSelector } from 'react-redux';
import SearchBar from './home/SearchBar';
import { Loading } from './shared';
import Navbar from './Navbar';
import {  FaRegCheckCircle } from 'react-icons/fa';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';

function HomePage() {
  const { pickup, distance } = useSelector((state) => state.search.locations);
  const { loading } = useSelector((state) => state.car);

  return (
    <div className="flex flex-col max-h-screen overflow-hidden">
      <Navbar />
      <div
        className={`w-full  h-full ${`bg-[url('https://static.bnr.bg/gallery/cr/da98ab795a90aeb6c218ae5548982be5.jpg')]`} bg-cover bg-center overflow-auto`}
      >
        <div className="w-full h-full min-h-[89vh] bg-[rgba(0_0_50/0.4)] flex justify-center ">
          <div className="flex flex-col  max-w-screen-xl w-full">
            <div className="w-full lg:pl-16">
              <h1 className="py-2 px-1 text-left text-4xl my-4 font-bold text-slate-50 text-shadow-lg shadow-slate-800">
                Let&apos;s find you a car, just a few clicks :)
              </h1>
              <div className="flex justify-start items-center my-2 p-1 space-x-12">
                <span className="flex items-center text-xl font-semibold text-slate-50 text-shadow-lg shadow-slate-800">
                  <FaRegCheckCircle /> Easy
                </span>
                <span className="flex items-center text-xl font-semibold text-slate-50 text-shadow-lg shadow-slate-800">
                  <AiOutlineThunderbolt /> Fast
                </span>
                <span className="flex items-center text-xl font-semibold text-slate-50 text-shadow-lg shadow-slate-800">
                  <MdLocationOn /> Any where in the world
                </span>
              </div>
            </div>
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
