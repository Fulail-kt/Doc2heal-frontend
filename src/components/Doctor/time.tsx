import React, { FC, useState } from 'react';
import bookingModal from '../../@types';
import Modal from '../modal/modal';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import Api from '../../services/api';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
// import ReactModal from 'react-modal';
import toast,{Toaster} from 'react-hot-toast';
const stripePromise = loadStripe("pk_test_51OLmR8SJmqVejvmLLPACje9c0hQVTUj3etLYfOMT7U4k9QrrBQdVTx9P4VbCJDwkeWjGjJEaAwkdlmYNwwPxpL1r00YkqK8KIv")

type FormValues = {
  Name: string;
  Age: number;
  note: string;
};



const Timeslot: FC<{ bookings: bookingModal[] }> = ({ bookings }) => {
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
    const [amount, setSelectedamount] = useState<number | null>(null);
    const [open, setOpen] = useState(false);
    const [bookingData, setBookingData] = useState({});
    const [clientSecret, setClientSecret] = useState<string | null>(null);
  
    const options= {
      clientSecret: clientSecret,
    };
  
    const closeModal = () => {
      setOpen(false);
    };
  
    const openModal = () => {
      closeModal();
      setOpen(true);
    };
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormValues>();
  
    const navigate = useNavigate();
  
    const handleClick = (id: string, amount: number) => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
      setSelectedBookingId(id);
      setSelectedamount(amount);
      openModal();
    };
  
    const handleCloseModal = () => {
      setSelectedBookingId(null);
      closeModal();
    };
  
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      try {
        const booking = {
          username: data.Name,
          age: data.Age,
          note: data.note,
        };
        setBookingData(booking);
  
        const response = await Api.post('/payment', { amount });
  
        console.log(response.data.clientSecret);
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error submitting payment:', error);
      }
    };
  
    const SaveBooking = async () => {
      try {
        const response = await Api.post('/savebooking', { selectedBookingId, bookingData });
  
        console.log(response);
        if (response.data?.success) {
          toast.success(response.data?.message);
        }
  
        closeModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        console.log(error.message);
        
      }
    };
  
    return (
      <>
        <Toaster />
        <div className='w-full text-center'>
          {clientSecret && (
            <Modal isOpen={open} onClose={closeModal} >
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm savebooking={SaveBooking} />
              </Elements>
            </Modal>
          )}
          <h1>Available Appointment</h1>
          <div className='flex justify-center w-full'>
            {bookings?.map((booking) => (
              <div
                className={`${
                  booking.status === 'booked' ? 'bg-slate-500' : 'bg-gray-700'
                } rounded-md items-center font-light p-1 text-white text-center w-52`}
                key={booking._id}
                onClick={() => (booking.status !== 'booked' ? handleClick(booking._id,booking.fee) : null)}
              >
                <p>{new Date(booking.date).toLocaleDateString()}</p>
                <p>
                  {new Date(booking.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} to{' '}
                  {new Date(booking.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className={`${booking.status === 'pending' ? 'text-green-500' : ''}`}>
                  {booking.status === 'pending' ? 'Available' : booking.status}
                </p>
              </div>
            ))}
          </div>
        </div>
        {selectedBookingId && !clientSecret && (
          <Modal isOpen={true} onClose={handleCloseModal}>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mt-2'>
                  <label htmlFor='Name'>Name:</label>
                  <input
                    type='text'
                    className='border border-gray-300 p-2 w-full'
                    {...register('Name', { required: 'Name is required' })}
                  />
                  {errors.Name && <span className='text-red-500'>{errors.Name.message}</span>}
                </div>
  
                <div className='mt-2'>
                  <label htmlFor='Age'>Age:</label>
                  <input
                    type='number'
                    className='border border-gray-300 p-2 w-full'
                    {...register('Age', { required: 'Age is required', max: { value: 99, message: 'Age must be less than 99' } })}
                  />
                  {errors.Age && <span className='text-red-500'>{errors.Age.message}</span>}
                </div>
  
                <div className='mt-2 w-full'>
                  <label htmlFor='note'>Note:</label>
                  <textarea className='border border-gray-300 p-2 w-full' {...register('note', { required: 'Note is required' })} />
                  {errors.note && <span className='text-red-500'>{errors.note.message}</span>}
                </div>
  
                <div className=' flex justify-center'>
                  <button className='btn p-1 px-4 mt-' type='submit'>
                    Pay
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        )}
      </>
    );
  };
  
  export default Timeslot;
  