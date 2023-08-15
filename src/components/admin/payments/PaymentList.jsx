import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../shared';
import { useNavigate } from 'react-router-dom';
import { fetchPayments } from '../../../context/features/paymentSlice';
import { getFormattedDateTime } from '../../../utils/tools';

function PaymentList() {
  const { payments, loading } = useSelector((state) => state.payment);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (payments.length) return;
    dispatch(fetchPayments());
  }, [payments.length, dispatch]);

  return (
    <div className="relative box-border w-full h-screen px-2 overflow-x-hidden flex flex-col justify-start items-center overflow-y-auto max-w-full">
      <div className="w-full p-4 rounded-md flex justify-between items-center bg-blue-500 mx-2 py-2 my-4">
        <h2 className="text-2xl box-border text-white">Payments</h2>
      </div>
      <div className=" w-full">
        {loading ? (
          <Loading />
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="bg-blue-500 text-left text-white px-4 py-2 rounded-tl hidden sm:table-cell">
                  ID
                </th>
                <th className="bg-blue-500 text-left text-white px-4 py-2">
                  Amount
                </th>
                <th className="bg-blue-500 text-left text-white px-4 py-2 hidden lg:table-cell ">
                  Payment ID
                </th>
                <th className="bg-blue-500 text-left text-white px-4 py-2">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr
                  className="hover:bg-gray-100 bg-white cursor-pointer "
                  key={payment.id}
                  onClick={() => navigate(`/admin/payments/${payment.id}`)}
                >
                  <td className="px-4 py-2 hidden sm:table-cell">
                    {payment.id}
                  </td>
                  <td className="px-4 py-2 ">${payment.amount}</td>
                  <td className="px-4 py-2 z-10 hidden lg:table-cell">
                    {payment.payment_id}
                  </td>
                  <td className="px-4 py-2">
                    {getFormattedDateTime(payment.created_at)}
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

export default PaymentList;
