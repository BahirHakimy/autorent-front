import React, { useEffect } from 'react';
import { Loading } from '../../shared';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBookings } from '../../../context/features/bookingSlice';
import { FcInfo } from 'react-icons/fc';

function BookingDetail(props) {
  const { bookings, loading } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (bookings.length > 0) return;
    dispatch(fetchBookings());
  }, [bookings.length, dispatch]);

  const booking = bookings.filter((booking) => booking.id === parseInt(id))[0];

  const handleCancel = () => {
    dispatch(
      cancelBooking({
        id,
        callback: () => toast('Booking Canceled'),
        reject: () => toast.error('Failed to cancel your booking'),
      })
    );
  };

  return (
    <div className="relative box-border w-full h-screen px-2 overflow-x-hidden flex flex-col justify-start items-center overflow-y-auto max-w-full">
      <div className="w-full p-4 rounded-md flex justify-between items-center bg-blue-500 mx-2 py-2 my-4">
        <h2 className="text-2xl box-border text-white">
          Users #{booking?.booking_number}
        </h2>
      </div>
      <div className="w-full">
        {loading || !booking ? (
          <Loading />
        ) : (
          <div className="bg-white p-2 md:p-6 shadow-md rounded">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <FcInfo size={20} />
              <span className="tracking-wide">User Details</span>
            </div>
            <div className="text-gray-700">
              <div className="grid md:grid-cols-2 text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">First Name</div>
                  <div className="px-4 py-2">
                    {booking}
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Last Name</div>
                  <div className="px-4 py-2">
                    {' '}
                    {user.last_name || (
                      <span className="text-slate-400 text-sm font-semibold">
                        N/A
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Contact No</div>
                  <div className="px-4 py-2">
                    {user.phone_number || (
                      <span className="text-slate-400 text-sm font-semibold">
                        N/A
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Date Joined</div>
                  <div className="px-4 py-2">
                    {getFormattedDateTime(user.date_joined)}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Is Staff</div>
                  <div className="px-4 py-2">
                    {user.is_staff ? (
                      <FaCheck className="text-blue-500" />
                    ) : (
                      <FaTimes />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Email</div>
                  <div className="px-4 py-2">
                    <a className="text-blue-800" href={`mailto:${user.email}`}>
                      {user.email}
                    </a>
                  </div>
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
                to={`/admin/users/edit/${user.id}`}
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
