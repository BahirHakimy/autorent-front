import React, { useEffect } from 'react';
import { Loading } from '../../shared';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchBookings } from '../../../context/features/bookingSlice';
import { FcInfo } from 'react-icons/fc';
import { getFormattedDateTime } from '../../../utils/tools';

function BookingDetail() {
  const { bookings, loading } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const { booking_id } = useParams();

  useEffect(() => {
    if (bookings.length > 0) return;
    dispatch(fetchBookings());
  }, [bookings.length, dispatch]);

  const booking = bookings.filter(
    (booking) => booking.id === parseInt(booking_id)
  )[0];

  // const handleCancel = () => {
  //   dispatch(
  //     cancelBooking({
  //       id,
  //       callback: () => toast('Booking Canceled'),
  //       reject: () => toast.error('Failed to cancel your booking'),
  //     })
  //   );
  // };

  return (
    <div className="relative box-border w-full h-screen px-2 overflow-x-hidden flex flex-col justify-start items-center overflow-y-auto max-w-full">
      <div className="w-full p-4 rounded-md flex justify-between items-center bg-blue-500 mx-2 py-2 my-4">
        <h2 className="text-2xl box-border text-white">
          Booking #{booking?.booking_number}
        </h2>
      </div>
      <div className="w-full">
        {loading || !booking ? (
          <Loading />
        ) : (
          <div className="bg-white p-2 md:p-6 shadow-md rounded">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <FcInfo size={20} />
              <span className="tracking-wide">Booking Details</span>
            </div>
            <div className="text-gray-700">
              <div className="grid md:grid-cols-2 text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Pickup Location</div>
                  <div className="px-4 py-2">{booking.pick_up_location}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">
                    Dropoff Location
                  </div>
                  <div className="px-4 py-2">{booking.drop_off_location}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Pickup Date</div>
                  <div className="px-4 py-2">
                    {getFormattedDateTime(booking.booked_from)}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Dropoff Date</div>
                  <div className="px-4 py-2">
                    {getFormattedDateTime(booking.booked_until)}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Cost Paid</div>
                  <div className="px-4 py-2">${booking.total_cost}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Booked For</div>
                  <div className="px-4 py-2">
                    {booking.booking_amount}
                    {booking.booking_type === 'By Distance'
                      ? ' KilloMeters'
                      : ' Days'}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Customer</div>

                  <Link
                    to={`/admin/users/${booking.user.id}`}
                    className="px-4 py-2 underline text-sky-500"
                  >
                    {booking.user.email}
                  </Link>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Vehicle</div>

                  <Link
                    to={`/admin/cars/${booking.car.id}`}
                    className="px-4 py-2 underline text-sky-500"
                  >
                    {booking.car.model}
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 items-center mt-8">
              <Link
                to="/admin/users"
                className="py-2 px-4 bg-blue-500 rounded text-xs md:text-sm font-semibold text-white"
              >
                Back
              </Link>
              <Link
                to={`/admin/users/edit/${2}`}
                className="py-2 px-4 bg-sky-500 rounded text-xs md:text-sm font-semibold text-white"
              >
                Edit Details
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingDetail;
