import { useEffect } from 'react';
import { Loading } from '../../shared';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { FcInfo } from 'react-icons/fc';
import { getFormattedDateTime } from '../../../utils/tools';
import { fetchPayment } from '../../../context/features/paymentSlice';
import toast from 'react-hot-toast';

function PaymentDetail() {
  const { payment, loading, error } = useSelector((state) => state.payment);
  const dispatch = useDispatch();
  const { payment_id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPayment(payment_id));
  }, [dispatch, payment_id]);

  const getBadge = () => {
    switch (payment?.status) {
      case 'completed':
        return (
          <span className="p-1 bg-green-500 rounded text-xs md:text-sm font-semibold text-white">
            Completed
          </span>
        );

      case 'refunded':
        return (
          <span className="p-1 bg-orange-500 rounded text-xs md:text-sm font-semibold text-white">
            Refunded
          </span>
        );
    }
  };

  if (error) {
    toast.error(error);
    return <Navigate to="/admin/payments" />;
  }

  return (
    <div className="relative box-border rounded-t-xl bg-white w-full h-screen mt-2 mr-2 px-2 overflow-x-hidden flex flex-col justify-start items-center overflow-y-auto max-w-full">
      <div className="w-full p-4 rounded-md flex justify-between items-center bg-blue-500 mx-2 py-2 my-4">
        <h2 className="text-base md:text-2xl box-border text-white">
          Payment #{payment?.id}
        </h2>
        {getBadge()}
      </div>
      <div className="w-full">
        {loading || !payment ? (
          <Loading />
        ) : (
          <div className="relative bg-white p-2 md:p-6 shadow-md rounded">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <FcInfo size={20} />
              <span className="tracking-wide">Payment Details</span>
            </div>
            <div className="text-gray-700">
              <div className="grid md:grid-cols-2 text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-1 md:px-2 lg:px-4 py-2 font-semibold">
                    Amount
                  </div>
                  <div className="px-1 md:px-2 lg:px-4 py-2">
                    ${payment.amount}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-1 md:px-2 lg:px-4 py-2 font-semibold">
                    Payment ID
                  </div>
                  <div className="px-1 md:px-2 lg:px-4 py-2">
                    {payment.payment_id}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-1 md:px-2 lg:px-4 py-2 font-semibold">
                    Created At
                  </div>
                  <div className="px-1 md:px-2 lg:px-4 py-2">
                    {getFormattedDateTime(payment.created_at)}
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="px-1 md:px-2 lg:px-4 py-2 font-semibold">
                    Booking
                  </div>

                  <Link
                    to={`/admin/bookings/${payment.booking.id}`}
                    className="px-1 md:px-2 lg:px-4 py-2 underline whitespace-nowrap text-sky-500"
                  >
                    Booking of {payment.booking.user.email}
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 items-center mt-8">
              <button
                onClick={() => navigate(-1)}
                className="py-2 px-4 bg-cyan-600 active:bg-blue-600 hover:bg-blue-400 rounded text-xs md:text-sm font-semibold text-white"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentDetail;
