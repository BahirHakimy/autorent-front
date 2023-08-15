import { useEffect } from 'react';
import { Loading } from '../../shared';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  updateBookingStatus,
  deleteBooking,
  fetchBooking,
} from '../../../context/features/bookingSlice';
import { FcInfo } from 'react-icons/fc';
import { getFormattedDateTime } from '../../../utils/tools';
import toast from 'react-hot-toast';

function BookingDetail() {
  const { booking, bookingError, loading } = useSelector(
    (state) => state.booking
  );
  const dispatch = useDispatch();
  const { booking_id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBooking(booking_id));
  }, [booking_id, dispatch]);

  const handleCancel = () => {
    dispatch(
      updateBookingStatus({
        id: booking.id,
        callback: () => toast('Booking Canceled'),
        reject: () => toast.error('Failed to cancel booking'),
      })
    );
  };

  const markComplete = () => {
    dispatch(
      updateBookingStatus({
        id: booking.id,
        status: 'completed',
        callback: () => toast('Booking Updated'),
        reject: () => toast.error('Failed to update booking'),
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      deleteBooking({
        id: booking.id,
        callback: () => toast.success('Booking Deleted'),
        reject: () => toast.error('Failed to delete booking'),
      })
    );
  };

  const getBadge = () => {
    switch (booking?.booking_status) {
      case 'Idle':
        return (
          <span className="absolute  right-0 p-1 px-4 bg-yellow-400 rounded-l-3xl text-xs md:text-sm font-semibold text-blue-700">
            Payment Pending
          </span>
        );

      case 'Completed':
        return (
          <span className="absolute  right-0 p-1 px-4 bg-green-500 rounded-l-3xl text-xs md:text-sm font-semibold text-white">
            Completed
          </span>
        );

      case 'Canceled':
        return (
          <span className="absolute  right-0 p-1 px-4 bg-red-500 rounded-l-3xl text-xs md:text-sm font-semibold text-white">
            Canceled
          </span>
        );

      case 'Active':
        return (
          <span className="absolute  right-0 p-1 px-4 bg-sky-500 rounded-l-3xl text-xs md:text-sm font-semibold text-white">
            Active
          </span>
        );

      case 'Upcomming':
        return (
          <span className="absolute  right-0 p-1 px-4 bg-sky-500 rounded-l-3xl text-xs md:text-sm font-semibold text-white">
            Upcomming
          </span>
        );
    }
  };

  if (bookingError) {
    toast.error(bookingError);
    return <Navigate to="/admin/bookings" />;
  }

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
          <div className="relative bg-white p-2 md:p-6 shadow-md rounded">
            {getBadge()}
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <FcInfo size={20} />
              <span className="tracking-wide">Booking Details</span>
            </div>
            <div className="text-gray-700">
              <div className="grid md:grid-cols-2 text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-3 lg:px-4 py-2 font-semibold">
                    Pickup Location
                  </div>
                  <div className="px-3 lg:px-4 py-2">
                    {booking.pick_up_location}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-3 lg:px-4 py-2 font-semibold">
                    Dropoff Location
                  </div>
                  <div className="px-3 lg:px-4 py-2">
                    {booking.drop_off_location}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-3 lg:px-4 py-2 font-semibold">
                    Pickup Date
                  </div>
                  <div className="px-3 lg:px-4 py-2">
                    {getFormattedDateTime(booking.booked_from)}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-3 lg:px-4 py-2 font-semibold">
                    Dropoff Date
                  </div>
                  <div className="px-3 lg:px-4 py-2">
                    {getFormattedDateTime(booking.booked_until)}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-3 lg:px-4 py-2 font-semibold">
                    Cost Paid
                  </div>
                  <div className="px-3 lg:px-4 py-2">${booking.total_cost}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-3 lg:px-4 py-2 font-semibold">
                    Booked For
                  </div>
                  <div className="px-3 lg:px-4 py-2">
                    {booking.booking_amount}
                    {booking.booking_type === 'By Distance'
                      ? ' KilloMeters'
                      : ' Days'}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-3 lg:px-4 py-2 font-semibold">
                    Customer
                  </div>

                  <Link
                    to={`/admin/users/${booking.user.id}`}
                    className="px-3 lg:px-4 py-2 underline text-sky-500"
                  >
                    {booking.user.email}
                  </Link>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-3 lg:px-4 py-2 font-semibold">Vehicle</div>

                  <Link
                    to={`/admin/cars/${booking.car.id}`}
                    className="px-3 lg:px-4 py-2 underline text-sky-500"
                  >
                    {booking.car.model}
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 items-center mt-8">
              <button
                onClick={() => navigate(-1)}
                className="py-2 px-4 bg-blue-500 active:bg-blue-600 hover:bg-blue-400 rounded text-xs md:text-sm font-semibold text-white"
              >
                Back
              </button>
              {['Canceled', 'Completed'].includes(booking.booking_status) && (
                <button
                  onClick={handleDelete}
                  className="py-2 px-4 bg-rose-500 active:bg-rose-600 hover:bg-rose-400 rounded text-xs md:text-sm font-semibold text-white"
                >
                  Delete Booking
                </button>
              )}
              {['Upcomming', 'Active'].includes(booking.booking_status) && (
                <button
                  onClick={handleCancel}
                  className="py-2 px-4 bg-rose-500 active:bg-rose-600 hover:bg-rose-400 rounded text-xs md:text-sm font-semibold text-white"
                >
                  Cancel Booking
                </button>
              )}
              {booking.booking_status === 'Active' && (
                <button
                  onClick={markComplete}
                  className="py-2 px-4 bg-rose-500 active:bg-rose-600 hover:bg-rose-400 rounded text-xs md:text-sm font-semibold text-white"
                >
                  Mark Complete
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingDetail;
