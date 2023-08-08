/* eslint-disable react/prop-types */

import { CardInput } from '../payments';

function PaymentFooter({ booking }) {
  return (
    <div className="flex flex-wrap md:flex-nowrap items-start md:space-x-2 space-y-2 md:space-y-0">
      <div className="bg-white shadow-md rounded p-4 w-full md:w-1/2">
        <div className="mb-3">
          <h2 className="text-base md:text-xl font-semibold">
            Booking cost summary
          </h2>
          <div className="mt-2">
            <div className="text-gray-600">Booked for</div>
            <div className="text-base md:text-xl font-bold">
              {booking.booking_type === 'By Distance'
                ? booking.booking_amount
                : parseInt(booking.booking_amount)}{' '}
              {booking.booking_type === 'By Distance' ? ' KMs' : ' Days'}
            </div>
          </div>
        </div>
        <hr className="my-2" />
        <div className="text-gray-600">
          Price for{' '}
          {booking.booking_type === 'By Distance'
            ? booking.booking_amount
            : parseInt(booking.booking_amount)}{' '}
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
  );
}

export default PaymentFooter;
