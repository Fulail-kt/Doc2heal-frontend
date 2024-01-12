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
    const [bookings, setBookings] = useState<bookingModal[]>();
    const [refresh, setRefresh] = useState<boolean>(false);
    const [endTime, setEndTime] = useState()
    const [startTime, setStartTime] = useState<any>()
    const [endDate, setEndDate] = useState()
    const [startDate, setStartDate] = useState()

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
            currentTime: currentDateTime.format('HH:mm'),
        };
    };

    const { currentDate, currentTime } = getCurrentDateTime();
    const [selected, setSelected] = useState(currentDate)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (!startDate || !endDate) {
                return toast.error("please fill all fields")
            }

            const startDateTime = moment(`${startDate}T${startTime}`);
            const endDateTime = moment(`${endDate}T${endTime}`);

            // if (endDateTime.diff(startDateTime, 'hours') <= 5) return;
            if (startDateTime.isAfter(endDateTime)) {
                toast.error("invalid date or time")
                return;
            }
            const occurrences = [];
            const interval = moment.duration(1, 'hours');

            let currentDateTime = startDateTime.clone();

            while (currentDateTime.isBefore(endDateTime)) {
                occurrences.push({
                    start: currentDateTime.format('YYYY-MM-DD hh:mm:ss A'),
                    end: currentDateTime.add(interval).format('YYYY-MM-DD hh:mm:ss A')
                });
                // Check if the current time has exceeded the specified end time
                if (currentDateTime.isSameOrAfter(moment(`${currentDateTime.format('YYYY-MM-DD')}T${endTime}`))) {
                    currentDateTime.set('hour', startTime.split(':')[0]);
                    currentDateTime.set('minute', startTime.split(':')[1]);
                    currentDateTime.add(1, 'days');
                }
            }

            const response = await Api.post('/doctor/setTimeslot', { occurrences });
            if (response.data.message) {
                toast.success(response.data.message)
                setRefresh((prev) => !prev);
                closeModal()
            }
        } catch (error) {
            // console.log((error as Error).message);
        }
    };

    const handleDelete = async (bookingId: string) => {
        try {
            const res = await Api.delete('/doctor/deleteBooking', { params: { id: bookingId, }, });

            if (res.data.success) {
                toast.success("successfully deleted")
                setRefresh((prev) => !prev);
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            // toast.error((error as Error).message)
        }
    }

    const token: any = localStorage.getItem("token")
    const decode = jwtDecode<{ id: string; role: string }>(token);
    const id = decode?.id

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const slots = await Api.get(`/getbookings`, { params: { id, selected } });
                setBookings(slots.data.bookings);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSlots();
    }, [id, refresh, selected]);

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
                                <form className='w-full' onSubmit={handleSubmit}>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div className='w-full flex p-1 gap-x-9  items-center '>
                                            <div className='flex justify-around w-1/2 items-center'>
                                                <div className='border grid place-items-center  rounded-md'>
                                                    <div className='bg-slate-400 w-full text-white text-center rounded-sm'><span className='text-sm'>Start Date :</span></div>
                                                    <input
                                                        type='date'
                                                        name='startDate'
                                                        onChange={(e: any) => setStartDate(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex justify-around w-1/2 items-center'>
                                                <div className='border grid place-items-center  rounded-md'>
                                                    <div className='bg-slate-400 w-full text-white text-center rounded-sm'><span className='text-sm'>End Date :</span></div>
                                                    <input
                                                        type='date'
                                                        name='endDate'
                                                        // defaultValue={currentDate}
                                                        onChange={(e: any) => setEndDate(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex w-full p-1 items-center '>
                                            <div className='flex justify-around w-1/2 items-center'>
                                                <div className='border grid place-items-center  rounded-md'>
                                                    <div className='bg-slate-400 w-full text-white text-center rounded-sm'><span className='text-sm '>Start Time :</span></div>
                                                    <input
                                                        type='time'
                                                        name='startTime'
                                                        defaultValue={currentTime}
                                                        onChange={(e: any) => setStartTime(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex justify-around w-1/2 items-center'>
                                                <div className='border grid place-items-center rounded-md'>
                                                    <div className='bg-slate-400 w-full text-white text-center rounded-sm'><span className='text-sm'>End Time :</span>{' '}</div>
                                                    <input
                                                        type='time'
                                                        name='endTime'
                                                        defaultValue={currentTime}
                                                        onChange={(e: any) => setEndTime(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type='submit'
                                            className='btn p-2 px-5 mt-2 bg-slate-500 tracking-widest'>
                                            Create
                                        </button>
                                    </div>
                                </form>
                            </>
                        </Modal>
                        <div className='flex flex-wrap justify-center w-full'>
                            <div className='w-full flex  justify-center text-white'>
                                <label className='border  p-1 rounded-md' htmlFor="">Select Date: <input type="Date" className='bg-transparent  outline-none' name="" id="" onChange={(e: any) => setSelected(e.target.value)} defaultValue={currentDate} /></label>

                            </div>
                            {bookings && bookings.length < 1 ? (<p className="font-mono font-bold text-2xl text-gray-800">No Any TimeSlots Created</p>) : (bookings?.map((booking) => (
                                <div
                                    className={`${booking.status === 'booked' ? 'bg-green-500' : booking.status === 'completed' ? 'bg-[#5046a8]' : booking.status === 'cancelled' ? 'bg-red-500' : 'bg-orange-400'} flex-shrink-0 w-1/4 rounded-md border font-light p-1 m-2 text-white text-center`} key={booking._id}>
                                    <div>
                                        {booking.status == "pending" ? <div className='flex items-center'>  <p className='w-full text-center'>{moment(booking.date).local().format('ll')}</p><p className='absolute cursor-pointer select-none text-red-500 text-center bg-white flex justify-center items-center p-0 m-0 rounded-full pb-0.5 w-4 h-4' onClick={() => handleDelete(booking._id)}>x</p></div> :
                                            <p>{moment(booking.date).local().format('ll')}</p>}
                                        <p>
                                            {/* {moment(booking.time)
                                                .tz('Asia/Kolkata')
                                                .format('h:mm A')}{' '}
                                            to{' '}
                                            {moment(booking.end)
                                                .tz('Asia/Kolkata')
                                                .format('h:mm A')} */}

                                            {moment(booking.time)
                                                .tz('Asia/Kolkata')
                                                .subtract(5, 'hours')
                                                .subtract(30, 'minutes')
                                                .format('h:mm A')}
                                            {' '}
                                            to{' '}
                                            {moment(booking.end)
                                                .tz('Asia/Kolkata')
                                                .subtract(5, 'hours')
                                                .subtract(30, 'minutes')
                                                .format('h:mm A')}
                                        </p>
                                        <p>{booking.status}</p>
                                    </div>



                                </div>
                            )))}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default TimeSlots;
