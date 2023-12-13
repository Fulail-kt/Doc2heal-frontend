import { FC, useEffect, useState } from 'react';
import Modal from '../../components/modal/modal';
import DocNavbar from '../../components/Navbar/DocNavbar';
import Api from '../../services/api';
import { jwtDecode } from 'jwt-decode';
import bookingModal from '../../@types';

const TimeSlots: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const [bookings, setBookings] = useState<bookingModal[]>();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const getCurrentDateTime = () => {
        const currentDate = new Date().toISOString().split('T')[0];
        const currentDateTime = new Date();
        currentDateTime.setSeconds(0, 0);
        const currentTime = currentDateTime.toTimeString().slice(0, 5);
        return { currentDate, currentTime };
    };
    const { currentDate, currentTime } = getCurrentDateTime();


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!date || !time) {
            setDate(currentDate)
            setTime(currentTime)
        }
        if (date || time) {
            try {
                const response = await Api.post('/doctor/setTimeslot', { date, time })
                console.log(response);

            } catch (error) {
                console.log(error.message);
                
            }
        }
    }

    const token= localStorage.getItem("token")
    
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
    }, [id]);


    return (
        <>
            <div className='bg-[#202231] w-full h-16'></div>
            <div className='flex w-full'>

                <DocNavbar />

                <div className='w-full p-5 bg-slate-400 rounded-lg m-3 mx-5'>
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
            booking.status === "booked" ? `bg-green-500` : `bg-orange-400`
        } flex-shrink-0 w-1/3 rounded-md border font-light p-1 m-2 text-white text-center`}
        key={booking._id}>
        <p>{new Date(booking.date).toLocaleDateString()}</p>
        <p>
            {new Date(booking.time).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            })}{' '}
            to{' '}
            {new Date(booking.end).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            })}
        </p>
        <p>{booking.status}</p>
    </div>
))}

</div>


                </div>
            </div>


        </>
    );
};

export default TimeSlots;
