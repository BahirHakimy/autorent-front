import { useEffect } from 'react';
import { FaChevronRight, FaCarAlt, FaShoppingBag, FaCar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  updateBookingStatus,
  fetchBooking,
} from '../../context/features/bookingSlice';
import { getFormattedDateTime } from '../../utils/tools';
import { BiStar, BiUser } from 'react-icons/bi';
import { GiGearStickPattern } from 'react-icons/gi';
import { Loading } from '../shared';
import PaymentFooter from './PaymentFooter';
import toast from 'react-hot-toast';

function Booking() {
  const { booking, bookingError, loading } = useSelector(
    (state) => state.booking
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchBooking(id));
  }, [dispatch, id]);

  const handleCancel = () => {
    dispatch(
      updateBookingStatus({
        id,
        callback: () => {
          toast('Booking Canceled');
          dispatch(fetchBooking(id));
        },
        reject: () => toast.error('Failed to cancel your booking'),
      })
    );
  };

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
            Active
          </span>
        );

      case 'Upcomming':
        return (
          <span className="p-1 bg-sky-500 rounded text-xs md:text-sm font-semibold text-white">
            Upcomming
          </span>
        );
    }
  };

  if (bookingError) {
    toast.error(bookingError);
    return <Navigate to="/dashboard" />;
  }

  if (loading || !booking) return <Loading />;

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
            <h2 className="text-base md:text-2xl font-semibold px-4 flex items-center">
              <FaCar className="mr-2" /> Selected Car
            </h2>
            <div
              id="carCard"
              className="flex flex-wrap justify-between px-2 md:px-4 items-center bg-white "
            >
              <div className="px-1 md:px-4 flex flex-col">
                <h3 className="text-sm md:text-lg font-semibold my-2">
                  {booking.car.model}
                </h3>
                <ul className="py-4">
                  <li className="flex items-center p-2 font-semibold w-full bg-slate-200">
                    <BiUser className="mr-2" />
                    Number Of Seats:
                    <p className="text-sm block ml-auto pl-4">
                      {booking.car.number_of_seats}
                    </p>
                  </li>
                  <li className="flex items-center p-2 font-semibold w-full">
                    <GiGearStickPattern className="mr-2" />
                    Transmission Mode:{' '}
                    <p className="text-sm block ml-auto pl-4">Automatic</p>
                  </li>
                  <li className="flex items-center p-2 font-semibold w-full bg-slate-200">
                    <FaCarAlt className="mr-2" />
                    Car Type:
                    <p className="text-sm block ml-auto pl-4">
                      {booking.car.car_type}
                    </p>
                  </li>
                  <li className="flex items-center p-2 font-semibold w-full">
                    <BiStar className="mr-2" />
                    Rating:{' '}
                    <p className="text-sm block ml-auto pl-4">
                      {' '}
                      {booking.car.rating ? (
                        <>
                          <span className="text-sm mr-1 p-[2px] rounded bg-sky-500 text-white">
                            {booking.car.rating?.average}
                          </span>
                          {booking.car.rating?.count} Reviews
                        </>
                      ) : (
                        <span>No reviews yet</span>
                      )}
                    </p>
                  </li>
                </ul>
              </div>
              <img
                className="sm:w-1/3 lg:w-1/2"
                src={booking.car.image}
                alt="car image"
              />
            </div>
          </div>
        </div>
        {booking.booking_status === 'Idle' && (
          <PaymentFooter booking={booking} />
        )}
        {booking.booking_status === 'Active' ||
          (booking.booking_status === 'Upcomming' && (
            <div className="bg-white shadow-md rounded p-4 w-full">
              <h3 className="text-xl font-semibold flex items-center">
                <FaShoppingBag className="mr-2" /> Total Cost:
                <span className="font-bold text-slate-600 ml-2 text-semibold">
                  ${booking.total_cost}
                </span>
              </h3>
              <p className="text-sm font-semibold text-slate-700 p-2 rounded">
                Your car is awaiting you, We wish you a great adventure.
              </p>
              <div className="w-full flex justify-end space-x-4 items-center">
                <Link
                  to="/dashboard/my-bookings"
                  className="py-2 px-4 bg-blue-500 rounded text-xs md:text-sm font-semibold text-white"
                >
                  Back
                </Link>
                <button
                  onClick={handleCancel}
                  className="py-2 px-4 bg-red-500 rounded text-xs md:text-sm font-semibold text-white"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        {booking.booking_status === 'Canceled' && (
          <div className="bg-white flex items-center justify-between shadow-md rounded p-4 w-full">
            <p className="text-sm font-semibold text-white p-2 rounded bg-orange-600">
              This booking has been canceled
            </p>
            <div className="flex justify-end space-x-4 items-center">
              <Link
                to="/dashboard/my-bookings"
                className="py-2 px-4 bg-blue-500 rounded text-xs md:text-sm font-semibold text-white"
              >
                Back
              </Link>
              <Link
                to="/"
                className="py-2 px-4 bg-sky-500 rounded text-xs md:text-sm font-semibold text-white"
              >
                New Booking
              </Link>
            </div>
          </div>
        )}
        {booking.booking_status === 'Completed' && (
          <div className="bg-white flex items-center flex-wrap justify-between shadow-md rounded p-4 w-full">
            <p className="text-sm font-semibold text-slate-700 p-2 rounded">
              We would be glad to have your feedback.
            </p>
            <div className="flex justify-end space-x-4 items-center">
              <Link
                to="/dashboard/my-bookings"
                className="py-2 px-4 bg-blue-500 rounded text-xs md:text-sm font-semibold text-white"
              >
                Back
              </Link>
              <Link
                to={`/reviews/${booking.id}`}
                className="py-2 px-4 bg-sky-500 rounded text-xs md:text-sm font-semibold text-white"
              >
                Rate your experience
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Booking;
