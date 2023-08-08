import { useEffect } from 'react';
import { FaTrash, FaEdit, FaChevronRight, FaCarAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../shared';
import { fetchBookings } from '../../context/features/bookingSlice';
import { getFormattedDateTime } from '../../utils/tools';
import { BiStar, BiUser } from 'react-icons/bi';
import { GiGearStickPattern } from 'react-icons/gi';
import { PaymentForm, CardInput } from '../payments';

function Booking() {
  const { bookings, loading } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (bookings.length > 0) return;
    dispatch(fetchBookings());
  }, [bookings.length, dispatch]);

  const booking = bookings.filter((booking) => booking.id === parseInt(id))[0];

  const getBadge = () => {
    switch (booking.booking_status) {
      case 'Idle':
        return (
          <span className="p-1 bg-yellow-400 rounded text-xs md:text-sm font-semibold text-blue-700">
            Payment Pending
          </span>
        );

      case 'Completed':
        return (
          <span className="p-1 bg-green-500 rounded text-xs md:text-sm font-semibold text-white">
            Completed
          </span>
        );

      case 'Canceled':
        return (
          <span className="p-1 bg-red-500 rounded text-xs md:text-sm font-semibold text-white">
            Canceled
          </span>
        );

      case 'Active':
        return (
          <span className="p-1 bg-sky-500 rounded text-xs md:text-sm font-semibold text-white">
            Upcomming
          </span>
        );
    }
  };

  return (
    <div className="relative box-border w-full h-screen px-2 overflow-x-hidden flex flex-col justify-start items-center overflow-y-auto max-w-full">
      <div className="w-full p-4 rounded-md flex justify-between items-center bg-blue-500 mx-2 py-2 my-4">
        <h2 className="text-base md:text-2xl box-border text-white">
          Booking #{booking.booking_number}
        </h2>
        {getBadge()}
      </div>
      <div className="w-full">
        <div
          className={`border-2 p-2 md:p-4 border-yellow-300 rounded-md flex items-center justify-between`}
        >
          <div className="flex items-center justify-evenly text-xs md:text-base">
            <div className="flex flex-col">
              <p className="font-bold text-slate-700">
                {booking.pick_up_location.split(',')[0]}
              </p>
              <p className="text-slate-600">
                {getFormattedDateTime(new Date(booking.booked_from))}
              </p>
            </div>
            <FaChevronRight className="text-slate-700 mx-4" />
            <div className="flex flex-col">
              <p className="font-bold text-slate-700">
                {' '}
                {booking.drop_off_location.split(',')[0]}
              </p>
              <p className="text-slate-600">
                {' '}
                {getFormattedDateTime(new Date(booking.booked_until))}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-start mt-4 w-full">
          <div className="flex flex-col w-full shadow-md rounded my-2">
            <h2 className="text-base md:text-2xl font-semibold px-4">
              Selected Car
            </h2>
            <div
              id="carCard"
              className="flex flex-wrap justify-between px-2 md:px-8 items-center bg-white "
            >
              <div className="px-1 md:px-4 flex flex-col">
                <h3 className="text-sm md:text-lg font-semibold my-2">
                  {booking.car.model}
                </h3>
                <ul className="py-4">
                  <li className="flex items-center space-x-2">
                    <BiUser />{' '}
                    <p className="text-sm">
                      ${booking.car.number_of_seats} Seats
                    </p>
                  </li>
                  <li className="flex items-center space-x-2">
                    <GiGearStickPattern /> <p className="text-sm">Automatic</p>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FaCarAlt />{' '}
                    <p className="text-sm">{booking.car.car_type}</p>
                  </li>
                  <li className="flex items-center space-x-2">
                    <BiStar />{' '}
                    <p className="text-sm">
                      {booking.car.rating ? (
                        <>
                          <span className="text-sm mr-1 p-[2px] rounded bg-sky-500 text-white">
                            {booking.car.rating}
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
              <img className="w-1/3 " src={booking.car.image} alt="car image" />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap md:flex-nowrap items-start md:space-x-2 space-y-2 md:space-y-0">
          <div className="bg-white shadow-md rounded p-4 w-full md:w-1/2">
            <div className="mb-3">
              <h2 className="text-base md:text-xl font-semibold">
                Booking cost summary
              </h2>
              <div className="mt-2">
                <div className="text-gray-600">Booked for</div>
                <div className="text-base md:text-xl font-bold">
                  {booking.booking_amount}{' '}
                  {booking.booking_type === 'By Distance' ? ' KMs' : ' Days'}
                </div>
              </div>
            </div>
            <hr className="my-2" />
            <div className="text-gray-600">
              Price for {booking.booking_amount}{' '}
              {booking.booking_type === 'By Distance' ? ' KMs' : ' Days'}:
            </div>
            <div className="text-base md:text-xl font-bold">
              US$
              {booking.total_cost}
            </div>
          </div>
          <div className="flex justify-start w-full md:w-1/2">
            <CardInput />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
