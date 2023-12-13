import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState, FormEvent } from 'react';

interface CheckoutFormProps {
  savebooking: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ savebooking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) {
        setMessage(error.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        savebooking();
      }
    } catch (error) {
        const message=((error as Error).message );
        
      setMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div>{message}</div>
      <button disabled={!stripe || isLoading}>Submit</button>
    </form>
  );
};

export default CheckoutForm;
