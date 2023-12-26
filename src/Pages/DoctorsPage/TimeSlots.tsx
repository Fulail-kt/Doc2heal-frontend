import { FC, useEffect, useState } from 'react';
import Modal from '../../components/modal/modal';
import DocNavbar from '../../components/Navbar/DocNavbar';
import Api from '../../services/api';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import 'moment-timezone';
import bookingModal from '../../@types';
import toast, { Toaster } from 'react-hot-toast';

const TimeSlots: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const [bookings, setBookings] = useState<bookingModal[]>();
    const [refresh, setRefresh] = useState<boolean>(false);


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const getCurrentDateTime = () => {
        const currentDateTime = moment();
        return {
            currentDate: currentDateTime.format('YYYY-MM-DD'),
            currentTime: currentDateTime.format('HH:mm'), // Use 'HH:mm' for 24-hour format
        };
    };

    const { currentDate, currentTime } = getCurrentDateTime();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (!date || !time) {
                const currentDateTime = moment();
                setDate(currentDateTime.format('YYYY-MM-DD'))
                setTime(currentDateTime.format('HH:mm'))
            }




            if (!date || !time) {
                return
            }

            // Convert to UTC before sending to the server
            const utcDate = moment.utc(`${date}T${time}Z`);

            if (date && time) {

                const response = await Api.post('/doctor/setTimeslot', {
                    date: utcDate.format('YYYY-MM-DD'),
                    time: utcDate.format('HH:mm'),
                });


                console.log(response);
                if(response.data.message){

                    toast.success(response.data.message)
                    setRefresh((prev) => !prev);
                    closeModal()
                }
                console.log('API Response:', response);
            }



        } catch (error) {
            console.log((error as Error).message);
        }
    };

    const token = localStorage.getItem("token")
    const decode = jwtDecode<{ id: string; role: string }>(token);
    const id = decode?.id

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const slots = await Api.get('/getbookings', { params: { id } });

                setBookings(slots.data.bookings);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSlots();
    }, [id,refresh]);

    return (
        <>
            <Toaster />
            <div className='flex flex-col min-h-screen bg-gray-400'>
                <div className='bg-[#202231] w-full h-16'></div>
                <div className='flex flex-1 w-full'>
                    <div className='bg-[#202231]'>
                        <DocNavbar />
                    </div>
                    <div className='w-full p-5 bg-slate-400 '>
                        <div className='flex w-full justify-end'>
                            <button className='btn m-1 mb-4' onClick={openModal}>
                                Create Time Slot
                            </button>
                        </div>
                        <div className=' w-full text-white flex items-center h-12 mb-5 rounded-md'>
                            <div className='flex bg-slate-600 rounded-md font-thin tracking-widest justify-around w-full'><span>All</span> <span>Available</span> <span>Cancelled</span></div>
                        </div>
                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                            <>
                                <form onSubmit={handleSubmit}>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div className='flex justify-around w-full items-center'>
                                            <span className='overline'>Date :</span>{' '}
                                            <div className='border p-3 w-40 rounded-md'>
                                                <input type='date' name='date' defaultValue={currentDate} onChange={(e) => setDate(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className='flex justify-around w-full items-center'>
                                            <span className='overline'>Time :</span>{' '}
                                            <div className='border p-3 w-40 rounded-md'>
                                                <input type='time' name='time' defaultValue={currentTime} onChange={(e) => setTime(e.target.value)} />
                                            </div>
                                        </div>
                                        <button type='submit' className='btn p-2 px-5 mt-2 bg-slate-500 tracking-widest'>Create</button>
                                    </div>
                                </form>
                            </>
                        </Modal>
                        <div className='flex flex-wrap justify-center w-full'>
  {bookings?.map((booking) => (
    <div
      className={`${
        booking.status === 'booked'? 'bg-green-500': booking.status === 'completed'? 'bg-[#5046a8]': booking.status === 'cancelled'? 'bg-red-500': 'bg-orange-400'} flex-shrink-0 w-1/4 rounded-md border font-light p-1 m-2 text-white text-center`} key={booking._id}>
      <p>{moment(booking.date).local().format('ll')}</p>
      <p>
        {moment(booking.time)
          .tz('Asia/Kolkata')
          .subtract(5, 'hours')
          .subtract(30, 'minutes')
          .format('h:mm A')}{' '}
        to{' '}
        {moment(booking.end)
          .tz('Asia/Kolkata')
          .subtract(5, 'hours')
          .subtract(30, 'minutes')
          .format('h:mm A')}
      </p>
      <p>{booking.status}</p>
    </div>
  ))}
</div>

                    </div>
                </div>
            </div>


        </>
    );
};

export default TimeSlots;
