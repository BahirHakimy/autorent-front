import { useState } from 'react';
import { FaCarAlt, FaChevronRight } from 'react-icons/fa';
import { getFormattedDateTime } from '../utils/tools';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { BiStar, BiUser } from 'react-icons/bi';
import { GiGearStickPattern } from 'react-icons/gi';

import { Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import { createBooking } from '../context/features/bookingSlice';
const stripePromise = loadStripe(
  'pk_test_51NcOaFB1Lcz9jTJ0MM7hdTostTiHY20DnHZ29cNFw96yXmKJsDleal4eid7IEbOv6r2HN6XsLy7cToMglObgHqq600XaFCi240'
);

function Checkout() {
  const dispatch = useDispatch();
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
    car: { selectedCar },
    user: {
      user: { email },
    },
  } = useSelector((state) => state);

  const [chargeType, setChargeType] = useState('distance');
  const [chargeAmount, setChargeAmount] = useState(
    chargeType === 'distance' ? distance : 1
  );
  const stripe = useStripe();
  const elements = useElements();

  const handleTypeChange = () => {
    setChargeAmount(chargeType === 'days' ? distance : 1);
    setChargeType((type) => (type === 'distance' ? 'days' : 'distance'));
  };

  const handleSubmit = async () => {
    const card = elements.getElement(CardElement);

    const { paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: card,
    });
    const cost =
      chargeType === 'days'
        ? selectedCar.price_per_hour * 24 * chargeAmount
        : selectedCar.price_per_km * distance;

    dispatch(
      createBooking({
        pickup_location,
        dropoff_location,
        pickup_datetime,
        dropoff_datetime,
        chargeType,
        selectedCar: selectedCar.id,
        booking_amount: chargeAmount,
        tota_cost: cost,
        email,
        payment_method_id: paymentMethod.id,
      })
    );
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-screen-xl mx-auto p-2 md:p-4 w-full">
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
                      ${selectedCar.number_of_seats} Seats
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
                Car Booking Checkout
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
                    value={chargeAmount}
                    onChange={(event) => {
                      setChargeAmount(event.target.value);
                    }}
                    id="amount"
                    className="border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Enter amount"
                  />
                </div>
                <Elements stripe={stripePromise}>
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="email" className="font-medium">
                      Email Address
                    </label>
                    <input
                      className="border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
                      id="email"
                      name="name"
                      type="email"
                      defaultValue={email}
                      placeholder="jenny.rosen@example.com"
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="card-element" className="font-medium">
                      Credit or debit card
                    </label>
                    <CardElement
                      id="card-element"
                      className="border rounded-md p-3 focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <div className="card-errors" role="alert"></div>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="mt-4 w-full py-2 px-4 bg-green-500 text-white font-bold rounded hover:bg-green-600"
                  >
                    Confirm Payment
                  </button>
                </Elements>
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
                    US${selectedCar.price_per_km * chargeAmount}
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
                        US${selectedCar.price_per_hour * 24}
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="text-gray-600">
                    Price for {chargeAmount} days:
                  </div>
                  <div className="text-xl font-bold">
                    US${selectedCar.price_per_hour * 24 * chargeAmount}
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

export default Checkout;
