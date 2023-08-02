// import React from 'react';
import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaSearch } from 'react-icons/fa';
import { getFormattedDate } from '../utils/tools';
import { Suggestion } from './shared';
// import Map from './Map';

function HomePage() {
  // const now = new Date();
  const now = new Date();
  const tomorrow = new Date().setDate(now.getDate() + 1);

  const [dates, setDates] = useState({
    pickup_date: getFormattedDate(now),
    pickup_time: `${now.getHours()}:${now.getMinutes()}`,
    dropoff_date: getFormattedDate(tomorrow),
    dropoff_time: `${now.getHours()}:${now.getMinutes()}`,
  });

  const handleDates = ({ target }) => {
    const { value, id } = target;
    switch (id) {
      case 'pickup_date':
        setDates((state) => ({
          ...state,
          pickup_date: getFormattedDate(new Date(value)),
        }));
        break;
      case 'pickup_time':
        setDates((state) => ({
          ...state,
          pickup_time: value,
        }));
        break;
      case 'dropoff_date':
        setDates((state) => ({
          ...state,
          dropoff_date: getFormattedDate(new Date(value)),
        }));
        break;
      case 'dropoff_time':
        setDates((state) => ({
          ...state,
          dropoff_time: value,
        }));
        break;

      default:
        break;
    }
  };

  return (
    <div className="bg-blue-500 p-2 w-fit rounded-md mx-auto">
      <div className="flex justify-between items-start flex-wrap">
        <form className="flex flex-wrap w-full space-x-2">
          <Suggestion id="pickup" label={'Pick-up date'} />
          <Suggestion id="dropoff" label={'Drop-off date'} />
          <div className="w-full lg:w-auto flex space-x-2 my-1">
            <div className="w-2/3">
              <div className="flex min-h-[48px] lg:min-h-[64px] justify-start items-center max-w-full bg-white rounded-md px-2">
                <div className="h-full flex-1">
                  <FaCalendarAlt />
                </div>
                <div className="relative flex  flex-col justify-start items-start w-full ml-2">
                  <label className="text-sm" htmlFor="pickup_date">
                    Pick-up date
                  </label>
                  <input
                    className="opacity-0 absolute w-full"
                    type="date"
                    id="pickup_date"
                    name="pickup_date"
                    onChange={handleDates}
                    defaultValue={now}
                  />
                  <p className="font-semibold">{dates.pickup_date}</p>
                </div>
              </div>
            </div>
            <div className="w-1/3 ">
              <div className="flex min-h-[48px] lg:min-h-[64px] justify-start items-center max-w-full bg-white rounded-md px-2 pr-12">
                <div className="h-full flex-1">
                  <FaClock />
                </div>
                <div className="relative flex flex-col justify-start items-start w-full ml-2">
                  <label className="text-sm" htmlFor="pickup_time">
                    Time
                  </label>
                  <input
                    className="opacity-0 absolute w-full"
                    type="time"
                    id="pickup_time"
                    name="pickup_time"
                    onChange={handleDates}
                    onFocus={(event) => event.target.showPicker()}
                    defaultValue={now}
                  />
                  <p className="font-semibold">{dates.pickup_time}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-auto flex space-x-2 my-1">
            <div className="w-2/3">
              <div className="flex min-h-[48px] lg:min-h-[64px] justify-start items-center max-w-full bg-white rounded-md px-2">
                <div className="h-full flex-1">
                  <FaCalendarAlt />
                </div>
                <div className="relative flex flex-col justify-start items-start w-full ml-2">
                  <label className="text-sm" htmlFor="dropoff_date">
                    Drop-off date
                  </label>
                  <input
                    className="opacity-0 absolute w-full"
                    type="date"
                    id="dropoff_date"
                    name="dropoff_date"
                    onChange={handleDates}
                    defaultValue={tomorrow}
                  />
                  <p className="font-semibold">{dates.dropoff_date}</p>
                </div>
              </div>
            </div>
            <div className="w-1/3 ">
              <div className="flex min-h-[48px] lg:min-h-[64px] justify-start items-center max-w-full bg-white rounded-md pl-2 pr-12">
                <div className="h-full flex-1">
                  <FaClock />
                </div>
                <div className="relative flex flex-col justify-start items-start w-full ml-2">
                  <label className="text-sm" htmlFor="dropoff_time">
                    Time
                  </label>
                  <input
                    className="opacity-0 absolute w-full"
                    type="time"
                    id="dropoff_time"
                    name="dropoff_time"
                    onChange={handleDates}
                    defaultValue={now}
                    onFocus={(event) => event.target.showPicker()}
                  />

                  <p className="font-semibold">{dates.dropoff_time}</p>
                </div>
              </div>
            </div>
          </div>
          <button className="font-bold text-white bg-sky-500 w-full lg:w-auto rounded-md my-1 px-4 flex-1 min-h-[48px] lg:min-h-[64px]">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default HomePage;
