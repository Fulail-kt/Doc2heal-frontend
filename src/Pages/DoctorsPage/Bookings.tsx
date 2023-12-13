import { useEffect, useState } from 'react'
import DocNavbar from '../../components/Navbar/DocNavbar'
import Api from '../../services/api'
import toast, { Toaster } from 'react-hot-toast'
import Booking from '../../@types'


const Bookings = () => {

    const [uBooking, setUbooking] = useState<Array<Booking>>()
    const [cBooking, setCbooking] = useState<Array<Booking>>()
    const [fBooking, setFbooking] = useState<Booking>()

    const [completed, setCompleted] = useState(false)
    const [upcomming, setUpcomming] = useState(true)
    const [cancelled, setCancelled] = useState(false)



    const Upcomming = async () => {

        try {

            // for upcomming
            const upcomming = await Api.get('/doctor/getbookings', { params: { condition: 'booked' } })

            console.log(upcomming.data);

            if (upcomming.data.success) {
                setUbooking(upcomming.data.booking)
            } else {
                toast.error(upcomming.data.message)
            }


            // for completed booking
            const Completed = await Api.get('/doctor/getbookings', { params: { condition: 'completed' } })

            if (Completed.data.success) {
                setCbooking(Completed.data.booking);
            } else {
                toast.error(Completed.data.message);
            }


            // for cancelled booking
            const cancelledBookings = await Api.get('/doctor/getbookings', { params: { condition: 'cancelled' } });

            if (cancelledBookings.data.success) {
                setFbooking(cancelledBookings.data.booking);
            } else {
                toast.error(cancelledBookings.data.message);
            }


        } catch (error) {
            console.log((error as Error))
        }
    }


    // const Completed=()=>{

    // }

    // const Cancelled=()=>{

    // }
    const handleUpcommingClick=()=>{
        setUpcomming(true)
        setCompleted(false);
        setCancelled(false);
    }

    const handleCompletedClick = () => {
        setCompleted(true);
        setCancelled(false);
        setUpcomming(false)
    };

    useEffect(() => {

        Upcomming();

    }, [])


    console.log(uBooking);


    return (
        <>
            <Toaster />
            <div className='bg-slate-900 w-full h-14'>

            </div>
            <div className='w-full flex'>
                <DocNavbar />
                <div className='w-full bg-gray-400'>

                    <div className='w-full flex h-12 items-center justify-around '>
                    <span onClick={handleUpcommingClick} className={upcomming ? "text-blue-600  p-2 px-4 shadow-lg shadow-gray-900 rounded-md" : ""}>Upcoming</span>
                        <span onClick={handleCompletedClick} className={completed ? "text-blue-600  p-2 px-4 shadow-lg shadow-gray-900 rounded-md" : ""}>Completed</span>
                        <span>Cancelled</span>
                    </div>


                    <div className='mt-4'>

                      { upcomming&&
                      <>
                       <div className='w-full flex flex-col justify-center items-center'>
                            {uBooking?.map((ubook) => (
                                <>
                                    <div></div>
                                    <div className=' w-[70%] rounded-lg p-2 px-5 bg-white justify-around border m-3 items-center text-black flex' key={ubook?._id}>
                                        <p>{new Date(ubook.date).toLocaleDateString()}</p>
                                        <p>
                                            {new Date(ubook.time).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}{' '}
                                            to{' '}
                                            {new Date(ubook.end).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                        <button className='btn bg-green-600 p-2 mt-0'>Start Session</button>
                                    </div>
                                </>
                            ))}
                        </div>
                        </>}

                        {completed && (
                            <>
                                <h1>completed</h1>
                                <div className='w-full flex flex-col justify-center items-center'>
                                    {cBooking?.map((cbook) => (
                                        <>
                                            <div></div>
                                            <div className=' w-[70%] rounded-lg p-2 px-5 bg-white justify-around border m-3 items-center text-black flex' key={cbook?._id}>
                                                <p>{new Date(cbook.date).toLocaleDateString()}</p>
                                                <p>
                                                    {new Date(cbook.time).toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}{' '}
                                                    to{' '}
                                                    {new Date(cbook.end).toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </p>
                                                <button className='btn bg-green-600 p-2 mt-0'>Start Session</button>
                                            </div>
                                        </>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>


                </div>
            </div>
        </>
    )
}

export default Bookings
