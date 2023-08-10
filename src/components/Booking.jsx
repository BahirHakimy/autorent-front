import { useState } from 'react';
import { FaCarAlt, FaChevronRight } from 'react-icons/fa';
import { getDayDiff, getFormattedDateTime } from '../utils/tools';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { BiStar, BiUser } from 'react-icons/bi';
import { GiGearStickPattern } from 'react-icons/gi';
import { createBooking } from '../context/features/bookingSlice';
import Loading from './shared/Loading';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Booking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    locations: {
      pickup_location,
      dropoff_location,
      pickup_datetime,
      dropoff_datetime,
      distance,
    },
  } = useSelector((state) => state.search);

  const { selectedCar } = useSelector((state) => state.car);
  const {
    user: { email },
  } = useSelector((state) => state.user);
  const { loading, errors } = useSelector((state) => state.booking);

  const [chargeType, setChargeType] = useState('distance');
  const [chargeAmount, setChargeAmount] = useState(
    chargeType === 'distance'
      ? distance
      : getDayDiff(pickup_datetime, dropoff_datetime)
  );

  const handleTypeChange = () => {
    setChargeAmount(
      chargeType === 'days'
        ? distance
        : getDayDiff(pickup_datetime, dropoff_datetime)
    );
    setChargeType((type) => (type === 'distance' ? 'days' : 'distance'));
  };

  const handleSubmit = async () => {
    const cost =
      chargeType === 'days'
        ? (selectedCar.price_per_hour * 24 * chargeAmount).toFixed(2)
        : (selectedCar.price_per_km * chargeAmount).toFixed(2);

    const toastId = toast.loading('Saving your booking...');
    dispatch(
      createBooking({
        data: {
          email,
          pickup_datetime,
          dropoff_datetime,
          pick_up_location: pickup_location,
          drop_off_location: dropoff_location,
          booking_type: chargeType,
          car_id: selectedCar.id,
          booking_amount: chargeAmount,
          total_cost: cost,
        },
        callback: (booking_id) => {
          toast.success('Booking saved successfully!', {
            id: toastId,
          }),
            navigate(`/dashboard/my-bookings/${booking_id}`, { replace: true });
        },
        reject: (error) => toast.error(error, { id: toastId }),
      })
    );
  };

  if (!selectedCar) return <Navigate to="/home" />;

  return (
    <div>
      <Navbar />
      <div className="max-w-screen-xl mx-auto p-2 md:p-4 w-full">
        <div
          className={`border-2 p-4 ${
            errors.length ? 'border-red-400' : 'border-yellow-300'
          } rounded-md flex items-center justify-between`}
        >
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
        </div>
        <div className="flex justify-start mt-4 w-full">
          <div className="flex flex-col w-full">
            <div
              id="carCard"
              className="flex flex-wrap justify-between px-8 items-center bg-white shadow-md rounded my-2 p-2"
            >
              <div className="px-4 flex flex-col">
                <h3 className="text-lg font-semibold my-2">
                  {selectedCar.model}
                </h3>
                <ul className="py-4">
                  <li className="flex items-center space-x-2">
                    <BiUser />{' '}
                    <p className="text-sm">
                      {selectedCar.number_of_seats} Seats
                    </p>
                  </li>
                  <li className="flex items-center space-x-2">
                    <GiGearStickPattern /> <p className="text-sm">Automatic</p>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FaCarAlt />{' '}
                    <p className="text-sm">{selectedCar.car_type}</p>
                  </li>
                  <li className="flex items-center space-x-2">
                    <BiStar />{' '}
                    <p className="text-sm">
                      {selectedCar.rating ? (
                        <>
                          <span className="text-sm mr-1 p-[2px] rounded bg-sky-500 text-white">
                            {selectedCar.rating}
                          </span>
                          200 reviews
                        </>
                      ) : (
                        <span>No reviews yet</span>
                      )}
                    </p>
                  </li>
                </ul>
              </div>
              <img className="w-1/3 " src={selectedCar.image} alt="car image" />
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Select Charge Type
              </h2>
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="chargeType" className="font-medium">
                    Charge Type
                  </label>
                  <select
                    id="chargeType"
                    className="border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                    onChange={handleTypeChange}
                  >
                    <option value="per_km">Per KM</option>
                    <option value="per_day">Per Day</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="amount" className="font-medium">
                    Amount({chargeType === 'distance' ? 'KMs' : 'Days'})
                  </label>
                  <input
                    type="number"
                    min={chargeType === 'distance' ? distance : 1}
                    value={
                      chargeType === 'distance' ? chargeAmount : chargeAmount
                    }
                    readOnly={chargeType === 'days'}
                    onChange={(event) => {
                      setChargeAmount(event.target.value);
                    }}
                    id="amount"
                    className="border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Enter amount"
                  />
                </div>
                {loading ? (
                  <Loading />
                ) : (
                  <div>
                    <button
                      onClick={() => navigate(-1)}
                      className="bg-sky-500 hover:bg-sky-600 text-white font-semibold p-2 rounded-md transition duration-300"
                    >
                      Back to Car Select
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="bg-blue-500 ml-2 hover:bg-blue-600 text-white font-semibold p-2 rounded-md transition duration-300"
                    >
                      Create Booking
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <aside className="p-4 pt-2 w-1/3">
            <div className="mb-4">
              {chargeType === 'distance' ? (
                <div className="bg-white shadow-md rounded-lg p-4">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold">
                      Car price breakdown
                    </h2>
                    <div className="mt-4">
                      <div className="text-gray-600">Car charge per km</div>
                      <div className="text-xl font-bold">
                        US${selectedCar.price_per_km}
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="text-gray-600">
                    Price for {chargeAmount} KM:
                  </div>
                  <div className="text-xl font-bold">
                    US${(selectedCar.price_per_km * chargeAmount).toFixed(2)}
                  </div>
                </div>
              ) : (
                <div className="bg-white shadow-md rounded-lg p-4">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold">
                      Car price breakdown
                    </h2>
                    <div className="mt-4">
                      <div className="text-gray-600">Car charge per day</div>
                      <div className="text-xl font-bold">
                        US${(selectedCar.price_per_hour * 24).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="text-gray-600">
                    Price for {chargeAmount} days:
                  </div>
                  <div className="text-xl font-bold">
                    US$
                    {(selectedCar.price_per_hour * 24 * chargeAmount).toFixed(
                      2
                    )}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Booking;
