import { FaChevronRight, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';

import Navbar from './Navbar';
import MapImage from '../assets/maps.png';
import SUV from '../assets/suv.png';
import Sport from '../assets/sport.png';
import Sedan from '../assets/sedan.png';
import Minivan from '../assets/minivan.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailbleCars } from '../context/features/carSlice';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import CarCard from './cars/CarCard';
import { Map } from './map';
import { getFormattedDateTime } from '../utils/tools';

function CarList() {
  const dispatch = useDispatch();
  const [showMap, setShowMap] = useState(false);
  const {
    search: {
      locations: {
        pickup_location,
        dropoff_location,
        pickup_datetime,
        dropoff_datetime,
        pickup,
        distance,
      },
    },
    car: { availableCars, loading },
  } = useSelector((state) => state);

  useEffect(() => {
    if (
      !pickup_location ||
      !dropoff_location ||
      !pickup_datetime ||
      !dropoff_datetime
    )
      return;

    dispatch(
      fetchAvailbleCars({
        pickup_location,
        dropoff_location,
        pickup_datetime,
        dropoff_datetime,
      })
    );
  }, [
    dispatch,
    dropoff_datetime,
    dropoff_location,
    pickup_datetime,
    pickup_location,
  ]);

  return !pickup_location ||
    !dropoff_location ||
    !pickup_datetime ||
    !dropoff_datetime ? (
    <Navigate to="/home" />
  ) : (
    <div>
      {showMap && (
        <div className="top-0 bottom-0 left-0 right-0 z-50 absolute my-2 md:p-4 lg:p-8 backdrop-blur flex justify-center items-center">
          {pickup.lat && (
            <div className="w-full">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold my-2 text-slate-800">
                  Total Distance{' '}
                  {distance > 0 && (
                    <span className="text-slate-500 rounded">
                      ({distance.toFixed(2)} KM)
                    </span>
                  )}
                </h3>
                <button
                  onClick={() => setShowMap(false)}
                  className="drop-shadow shadow hover:shadow-lg active:shadow-inner p-2"
                >
                  <FaTimes />
                </button>
              </div>
              <Map />
            </div>
          )}
        </div>
      )}

      <Navbar />
      <div className="max-w-screen-xl mx-auto p-2 md:p-4">
        <div className="border-2 p-4 border-yellow-300 rounded-md flex items-center justify-between ">
          <div className="flex items-center justify-evenly">
            <div className="flex flex-col">
              <p className="font-bold text-slate-700">
                {pickup_location.split(',')[0]}
              </p>
              <p className="text-slate-600">
                {getFormattedDateTime(new Date(pickup_datetime))}
              </p>
            </div>
            <FaChevronRight className="text-slate-700 mx-4" />
            <div className="flex flex-col">
              <p className="font-bold text-slate-700">
                {' '}
                {dropoff_location.split(',')[0]}
              </p>
              <p className="text-slate-600">
                {' '}
                {getFormattedDateTime(new Date(dropoff_datetime))}
              </p>
            </div>
          </div>
          <button className="px-4 py-2 text-white bg-blue-500 rounded-md">
            Edit
          </button>
        </div>
        <div className="flex justify-start mt-4">
          <div className="hidden md:flex flex-col ">
            <div
              id="map"
              className="relative w-60 h-40 m-2 overflow-hidden flex flex-col items-center justify-center"
            >
              <img
                className="rounded-md absolute top-0 left-0 right-0 bottom-0"
                src={MapImage}
                alt="maps"
              />
              <FaMapMarkerAlt
                size={25}
                className="relative z-10 text-blue-500"
              />
              <button
                onClick={() => setShowMap(true)}
                className="px-2 py-1 my-2 text-sm text-white bg-blue-500 rounded z-10"
              >
                Show on map
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-xl px-2 text-slate-700">
              Las Vegas: {availableCars.length} Cars Availble
            </h2>
            <h4 className="text-slate-800 font-semibold px-2 mt-4">
              Pick by category
            </h4>
            <ul className="flex items-center mt-2">
              <li className="flex flex-col items-center border mx-2 border-slate-200 rounded-md shadow-sm">
                <img src={SUV} width={80} alt="Suv Image" />
                <p className="text-slate-700 font-semibold text-sm pb-2">
                  SUVs
                </p>
              </li>
              <li className="flex flex-col items-center border mx-2 border-slate-200 rounded-md shadow-sm">
                <img src={Sedan} width={80} alt="Sedan Image" />
                <p className="text-slate-700 font-semibold text-sm pb-2">
                  Sedan
                </p>
              </li>
              <li className="flex flex-col items-center border mx-2 border-slate-200 rounded-md shadow-sm">
                <img src={Minivan} width={80} alt="Minivan Image" />
                <p className="text-slate-700 font-semibold text-sm pb-2">
                  Minivan
                </p>
              </li>
              <li className="flex flex-col items-center border mx-2 border-slate-200 rounded-md shadow-sm">
                <img src={Sport} width={80} alt="Sport Image" />
                <p className="text-slate-700 font-semibold text-sm pb-2">
                  Sport
                </p>
              </li>
            </ul>
            {availableCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarList;
