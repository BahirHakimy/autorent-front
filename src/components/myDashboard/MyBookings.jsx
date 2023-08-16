import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Loading } from '../shared';
import { fetchBookings } from '../../context/features/bookingSlice';
import { getFormattedDateTime } from '../../utils/tools';
import { FaPlus } from 'react-icons/fa';

function MyBookings() {
  const { bookings, loading } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const getStatus = (status) => {
    switch (status) {
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

      case 'Upcomming':
        return (
          <span className="p-1 bg-sky-500 rounded text-xs md:text-sm font-semibold text-white">
            Upcomming
          </span>
        );

      case 'Active':
        return (
          <span className="p-1 bg-blue-500 rounded text-xs md:text-sm font-semibold text-white">
            Active
          </span>
        );
    }
  };

  return (
    <div className="relative box-border w-full h-screen px-2 overflow-x-hidden flex flex-col justify-start items-center overflow-y-auto max-w-full">
      <div className="w-full p-4 rounded-md flex justify-between items-center bg-blue-500 mx-2 py-2 my-4">
        <h2 className="text-2xl box-border text-white">Bookings</h2>
        <Link
          to="/"
          className="text-white bg-sky-500 px-4 py-2 rounded-md font-semibold flex items-center"
        >
          <FaPlus className="mr-2" /> New Booking
        </Link>
      </div>
      <div className=" w-full">
        {loading ? (
          <Loading />
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="bg-blue-500 text-left text-white px-1 md:px-2 lg:px-4 py-2 rounded-tl hidden sm:table-cell">
                  ID
                </th>
                <th className="bg-blue-500 text-left text-white px-1 md:px-2 lg:px-4 py-2">
                  Pickup Location
                </th>
                <th className="bg-blue-500 text-left text-white px-1 md:px-2 lg:px-4 py-2 hidden md:table-cell">
                  Date & Time
                </th>
                <th className="bg-blue-500 text-left text-white px-1 md:px-2 lg:px-4 py-2 hidden lg:table-cell ">
                  Total Cost
                </th>

                <th className="bg-blue-500 text-left text-white px-1 md:px-2 lg:px-4 py-2">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  className="hover:bg-gray-100 bg-white cursor-pointer"
                  key={booking.id}
                  onClick={() =>
                    navigate(`/dashboard/my-bookings/${booking.id}`)
                  }
                >
                  <td className="px-1 md:px-2 lg:px-4 py-2 hidden sm:table-cell">
                    {booking.id}
                  </td>
                  <td className="px-1 md:px-2 lg:px-4 py-2">
                    {booking.pick_up_location.split(',')[0]}
                  </td>
                  <td className="px-1 md:px-2 lg:px-4 py-2 hidden md:table-cell">
                    {getFormattedDateTime(booking.booked_from)}
                  </td>
                  <td className="px-1 md:px-2 lg:px-4 py-2 hidden lg:table-cell">
                    ${booking.total_cost}
                  </td>
                  <td className="px-1 md:px-2 lg:px-4 py-2">
                    {getStatus(booking.booking_status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
