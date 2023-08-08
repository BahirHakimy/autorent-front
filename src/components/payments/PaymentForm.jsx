import { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { axios } from '../../utils/api';
import { getUser } from '../../utils/auth';
import { useDispatch } from 'react-redux';
import { addToast } from '../../context/features/toastSlice';
import { useParams } from 'react-router-dom';

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    axios(getUser(false))
      .post('bookings/payment/', { booking_id: id })
      .then((response) => {
        console.log(response.data.client_secret);
        setClientSecret(response.data.client_secret);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      await axios(getUser(false)).post('bookings/create_payment/', {
        booking_id: id,
        paymentIntent: result.paymentIntent,
      });
      setError(null);
      dispatch(addToast('Payment successfull'));
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h1 className="text-base md:text-2xl font-semibold mb-4">
        Complete Your Payment
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div id="card-element" className="border p-3 rounded">
          <CardElement />
        </div>
        {error && (
          <div className="text-sm font-semibold text-red-500">{error}</div>
        )}
        <button
          id="submit-button"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;
