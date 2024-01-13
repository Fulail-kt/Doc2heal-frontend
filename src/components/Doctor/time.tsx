import { FC, useEffect, useState } from 'react';
import bookingModal from '../../@types';
import Modal from '../modal/modal';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import Api from '../../services/api';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import moment from 'moment';
import 'moment-timezone';
import toast, { Toaster } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
const stripePromise = loadStripe("pk_test_51OLmR8SJmqVejvmLLPACje9c0hQVTUj3etLYfOMT7U4k9QrrBQdVTx9P4VbCJDwkeWjGjJEaAwkdlmYNwwPxpL1r00YkqK8KIv")

type FormValues = {
    Name: string;
    Age: number;
    note: string;
};



const Timeslot: FC<{ bookings: bookingModal[], fetchbooking: any }> = ({ bookings, fetchbooking }) => {
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
    const [amount, setSelectedamount] = useState<number>(0);
    const [open, setOpen] = useState(false);
    const [bookingData, setBookingData] = useState({});
    const [clientSecret, setClientSecret] = useState<string | null | any>(null);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [useWallet, setUseWallet] = useState<boolean>(false);
    const [wallet, setWallet] = useState<number>(0);

    const options = {
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

    const handleClick = async (id: string, amount: number) => {
        const token: any = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        const decode: any = jwtDecode(token)
        const userId = decode.id
        setSelectedBookingId(id);
        setSelectedamount(amount);
        openModal();
        const user = await Api.get(`/getuser`, { params: { id: userId } });
        setWallet(user?.data?.user?.wallet?.balance);
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

            setClientSecret(response.data.clientSecret);

            setRefresh((prev) => !prev);


        } catch (error) {
            console.error('Error submitting payment:', error);
        }
    };

    const SaveBooking = async () => {
        try {

            const response = await Api.post('/savebooking', { selectedBookingId, bookingData, useWallet });

            if (response.data?.success) {
                toast.success(response.data?.message);
                fetchbooking()
            }
            closeModal();
            setRefresh((prev) => !prev);


        } catch (error) {
            console.log((error as Error).message);

        }
    };

    useEffect(() => {

    }, [refresh])

    return (
        <>
            <Toaster />
            <div className='w-full text-center'>
                {bookings.length === 0 && (
                    <p className='text-red-500 font-extralight text-lg p-4 tracking-widest'>No slots available at the selected date.</p>
                )}
                {clientSecret && (
                    <Modal isOpen={open} onClose={closeModal} >
                        <div className='w-52 sm:w-64 md:w-80'>
                            <Elements stripe={stripePromise} options={options}>
                                {!useWallet && <CheckoutForm savebooking={SaveBooking} />}
                                {amount <= wallet && <div className='w-full bg-gray-500 h-9 text-white flex justify-center items-center gap-x-3 rounded-md mt-2'><input type="checkbox" onChange={() => setUseWallet(!useWallet)} />Wallet : ₹ {wallet}</div>}
                                {useWallet && <button className='bg-gray-500 rounded-md px-4 mt-2 text-white' onClick={SaveBooking}>Submit</button>}
                            </Elements>
                        </div>
                    </Modal>
                )}
                <div className='flex justify-center w-full'>

                    <div className='flex w-[80%] justify-center  m-3'>
                        {bookings?.map((booking: { _id: any; status: string; date: string; time: string; end: string; } | any) => (
                            <div
                                className={`${booking.status === 'booked' ? 'bg-slate-500' : 'bg-gray-700'
                                    } m-3  rounded-md items-center font-light p-1 text-white text-center w-1/4 tracking-widest`}
                                key={booking._id}
                                onClick={() => (booking.status !== 'booked' ? handleClick(booking._id, booking.fee) : null)}
                            >
                                <p>{moment(booking.date).tz('Asia/Kolkata').format('L')}</p>
                                <p>
                                                                    {moment(booking.time).tz('Asia/Kolkata').subtract(5, 'hours').subtract(30, 'minutes').format('LT')} to{' '}
                                    {moment(booking.end).tz('Asia/Kolkata').subtract(5, 'hours').subtract(30, 'minutes').format('LT')}
                                    {/* {moment(booking.time).tz('Asia/Kolkata').format('LT')} to{' '} */}
                                    {/* {moment(booking.end).tz('Asia/Kolkata').format('LT')} */}
                                </p>
                                <p className={`${booking.status === 'pending' ? 'text-green-500' : ''}`}>
                                    {booking.status === 'pending' ? 'Available' : booking.status}
                                </p>
                                <p>{booking.fee}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {selectedBookingId && !clientSecret && (
                <Modal isOpen={true} onClose={handleCloseModal}>
                    <div className='w-48 sm:w-60 md:w-80'>
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
