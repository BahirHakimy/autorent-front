import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../../../context/features/bookingSlice';
import { Loading } from '../../shared';
import { useNavigate } from 'react-router-dom';

function BookingList() {
  const { bookings, loading } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (bookings.length) return;
    dispatch(fetchBookings());
  }, [bookings.length, dispatch]);

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

      case 'Active':
        return (
          <span className="p-1 bg-blue-500 rounded text-xs md:text-sm font-semibold text-white">
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

  return (
    <div className="relative box-border w-full h-screen px-2 overflow-x-hidden flex flex-col justify-start items-center overflow-y-auto max-w-full">
      <div className="w-full p-4 rounded-md flex justify-between items-center bg-blue-500 mx-2 py-2 my-4">
        <h2 className="text-2xl box-border text-white">Bookings</h2>
      </div>
      <div className=" w-full">
        {loading ? (
          <Loading />
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="bg-blue-500 text-left text-white px-4 py-2 rounded-tl">
                  ID
                </th>
                <th className="bg-blue-500 text-left text-white px-4 py-2">
                  Customer
                </th>
                <th className="bg-blue-500 text-left text-white px-4 py-2 hidden md:table-cell ">
                  Car
                </th>
                <th className="bg-blue-500 text-left text-white px-4 py-2 hidden md:table-cell ">
                  Total Cost
                </th>

                <th className="bg-blue-500 text-left text-white px-4 py-2 hidden md:table-cell ">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  className="hover:bg-gray-100 bg-white cursor-pointer"
                  key={booking.id}
                  onClick={() => navigate(`/admin/bookings/${booking.id}`)}
                >
                  <td className="px-4 py-2">{booking.id}</td>
                  <td className="px-4 py-2 z-10">{booking.user.email}</td>
                  <td className="px-4 py-2 hidden md:table-cell">
                    {booking.car.model}
                  </td>
                  <td className="px-4 py-2 hidden md:table-cell ">
                    ${booking.total_cost}
                  </td>
                  <td className="px-4 py-2 hidden md:table-cell ">
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

export default BookingList;
