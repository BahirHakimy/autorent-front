import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(
  'pk_test_51NcOaFB1Lcz9jTJ0MM7hdTostTiHY20DnHZ29cNFw96yXmKJsDleal4eid7IEbOv6r2HN6XsLy7cToMglObgHqq600XaFCi240'
);

function CardInput() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}

export default CardInput;
