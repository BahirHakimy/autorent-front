import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../shared';
import { useNavigate } from 'react-router-dom';
import {
  fetchPayments,
  setCurrentPage,
} from '../../../context/features/paymentSlice';
import { getFormattedDateTime } from '../../../utils/tools';

function PaymentList() {
  const { payments, currentPage, hasNext, loading } = useSelector(
    (state) => state.payment
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (payments.length < currentPage * 20) {
      if (currentPage > 1) {
        hasNext && dispatch(fetchPayments(currentPage));
      } else {
        dispatch(fetchPayments(currentPage));
      }
    }
  }, [payments.length, dispatch, currentPage, hasNext]);

  const handleScroll = (ev) => {
    const element = ev.target;
    if (element.scrollHeight - element.offsetHeight === element.scrollTop) {
      if (!loading && hasNext) {
        dispatch(setCurrentPage(currentPage + 1));
      }
    }
  };

  return (
    <div
      onScroll={handleScroll}
      className="relative box-border rounded-t-xl bg-white w-full h-screen mt-2 mr-2 px-2 overflow-x-hidden flex flex-col justify-start items-center overflow-y-auto max-w-full"
    >
      <div className="w-full p-4 rounded-md flex justify-between items-center bg-cyan-600 mx-2 py-2 my-4">
        <h2 className="text-2xl box-border text-white">
          {payments.length} Payments
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
                Amount
              </th>
              <th className="bg-cyan-500 text-left text-white px-4 py-2 hidden lg:table-cell ">
                Payment ID
              </th>
              <th className="bg-cyan-500 text-left text-white px-4 py-2">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr
                className="hover:bg-gray-100 bg-white cursor-pointer border-b "
                key={payment.id}
                onClick={() => navigate(`/admin/payments/${payment.id}`)}
              >
                <td className="px-4 py-2 hidden sm:table-cell">{payment.id}</td>
                <td className="px-4 py-2 ">${payment.amount}</td>
                <td className="px-4 py-2 z-10 hidden lg:table-cell">
                  {payment.payment_id}
                </td>
                <td className="px-4 py-2">
                  {getFormattedDateTime(payment.created_at)}
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

export default PaymentList;
