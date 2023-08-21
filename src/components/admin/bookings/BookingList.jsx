import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBookings,
  setCurrentPage,
  setSortProp,
} from '../../../context/features/bookingSlice';
import { Loading } from '../../shared';
import { useNavigate } from 'react-router-dom';
import { BiChevronDown } from 'react-icons/bi';
import { sortBasedOnProperty } from '../../../utils/tools';

function BookingList() {
  const { bookings, currentPage, hasNext, loading, sortProp } = useSelector(
    (state) => state.booking
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortType, setSortType] = useState('asc');

  React.useEffect(() => {
    if (bookings.length < currentPage * 20) {
      if (currentPage > 1) {
        hasNext && dispatch(fetchBookings(currentPage));
      } else {
        dispatch(fetchBookings(currentPage));
      }
    }
  }, [bookings.length, currentPage, dispatch, hasNext]);

  const getStatus = (status) => {
    switch (status) {
      case 'Idle':
        return (
          <span className="p-1 bg-yellow-400 rounded text-xs md:text-sm font-semibold whitespace-nowrap text-blue-700">
            Payment Pending
          </span>
        );

      case 'Completed':
        return (
          <span className="p-1 bg-green-500 rounded text-xs md:text-sm font-semibold whitespace-nowrap text-white">
            Completed
          </span>
        );

      case 'Canceled':
        return (
          <span className="p-1 bg-red-500 rounded text-xs md:text-sm font-semibold whitespace-nowrap text-white">
            Canceled
          </span>
        );

      case 'Active':
        return (
          <span className="p-1 bg-blue-500 rounded text-xs md:text-sm font-semibold whitespace-nowrap text-white">
            Active
          </span>
        );

      case 'Upcomming':
        return (
          <span className="p-1 bg-sky-500 rounded text-xs md:text-sm font-semibold whitespace-nowrap text-white">
            Upcomming
          </span>
        );
    }
  };

  const handleScroll = (ev) => {
    const element = ev.target;
    if (element.scrollHeight - element.offsetHeight === element.scrollTop) {
      if (!loading && hasNext) {
        dispatch(setCurrentPage(currentPage + 1));
      }
    }
  };

  let sortedBookings = sortProp
    ? sortBasedOnProperty(bookings, sortProp, sortType)
    : bookings;

  return (
    <div
      onScroll={handleScroll}
      className="relative box-border rounded-t-xl bg-white w-full h-screen mt-2 mr-2 px-2 overflow-x-hidden flex flex-col justify-start items-center overflow-y-auto max-w-full"
    >
      <div className="w-full p-4 rounded-md flex justify-between items-center bg-cyan-600 mx-2 py-2 my-4">
        <h2 className="text-2xl box-border text-white">
          {bookings.length} Bookings
        </h2>
      </div>
      <div className=" w-full">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="bg-cyan-500 text-left text-white px-4 py-2 rounded-tl hidden sm:table-cell">
                ID
              </th>
              <th className="bg-cyan-500 text-left text-white px-4 py-2">
                Customer
              </th>
              <th className="bg-cyan-500 text-left text-white px-4 py-2 hidden lg:table-cell">
                Car
              </th>
              <th className="bg-cyan-500 text-left text-white px-4 py-2 hidden md:table-cell whitespace-nowrap">
                Total Cost
                <BiChevronDown
                  onClick={() => dispatch(setSortProp('total_cost'))}
                />
              </th>

              <th className="bg-cyan-500 text-left text-white px-4 py-2 rounded-tr">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedBookings.map((booking) => (
              <tr
                className="hover:bg-gray-100 bg-white cursor-pointer border-b "
                key={booking.id}
                onClick={() => navigate(`/admin/bookings/${booking.id}`)}
              >
                <td className="px-1 sm:px-2 md:px-4 py-2 hidden sm:table-cell">
                  {booking.id}
                </td>
                <td className="px-1 sm:px-2 md:px-4 py-2 z-10">
                  {booking.user.email}
                </td>
                <td className="px-1 sm:px-2 md:px-4 py-2 hidden lg:table-cell">
                  {booking.car.model}
                </td>
                <td className="px-1 sm:px-2 md:px-4 py-2 hidden md:table-cell">
                  ${booking.total_cost}
                </td>
                <td className="px-1 sm:px-2 md:px-4 py-2">
                  {getStatus(booking.booking_status)}
                </td>
              </tr>
            ))}
            {hasNext && !loading && (
              <tr className="hover:bg-gray-100 bg-white cursor-pointer ">
                <td colSpan={5} className="text-center">
                  <button
                    className="shadow px-2 py-1 rounded-xl text-slate-500"
                    onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                  >
                    Load More
                  </button>
                </td>
              </tr>
            )}
            {loading && (
              <tr className="hover:bg-gray-100 bg-white cursor-pointer ">
                <td colSpan={5} rowSpan={4}>
                  <Loading />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingList;
