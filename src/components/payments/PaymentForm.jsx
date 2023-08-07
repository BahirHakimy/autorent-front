import { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { axios } from '../../utils/api';
import { getUser } from '../../utils/auth';

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  // Fetch the client secret from your backend when the component mounts
  useEffect(() => {
    // Make an API call to your Django endpoint to get the client secret
    axios(getUser(false))
      .post('/api/payment/', { booking_id: 1 })
      .then((response) => {
        setClientSecret(response.data.client_secret);
      });
    // and set it using setClientSecret(response.data.client_secret);
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
      // Payment successful, you can handle the success case here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {error && <div>{error}</div>}
    </form>
  );
}

export default PaymentForm;
