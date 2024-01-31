import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState, FormEvent, useEffect } from 'react';

interface CheckoutFormProps {
  savebooking: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ savebooking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(false);


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

      if (error ) {
        setMessage((error as unknown as Error).message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        
        savebooking();
        setRefresh((prev) => !prev);

      }
    } catch (error) {
        const message=((error as Error).message );
        
      setMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(()=>{

  },[refresh])

  return (
    <>
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div>{message}</div>
      <button className='bg-gray-500 rounded-lg mt-2 text-white px-3' disabled={!stripe || isLoading}>Submit</button>
    </form>
    </>
  );
};

export default CheckoutForm;
