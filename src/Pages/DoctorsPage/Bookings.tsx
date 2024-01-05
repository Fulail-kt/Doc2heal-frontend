import { useEffect, useState } from 'react'
import DocNavbar from '../../components/Navbar/DocNavbar'
import Api from '../../services/api'
import toast, { Toaster } from 'react-hot-toast'
import Booking from '../../@types'
import moment from 'moment'

import Booked from '../../components/Doctor/Booked'


const Bookings = () => {

    const [Books, setBookings] = useState<Array<Booking>|any>()




    const Upcomming = async () => {
        try {
            // for upcomming
            console.log("sail");
            
            const upcomming = await Api.get('/doctor/getAllbookings');
            if (upcomming.data.success) {
                const updatedUBooking = upcomming.data.booking.map((ubook: { time: Date, end: Date }) => ({
                    ...ubook,
                    time: moment(ubook.time).subtract(5, 'hours').subtract(30, 'minutes').format('hh:mm A'),
                    end: moment(ubook.end).subtract(5, 'hours').subtract(30, 'minutes').format('hh:mm A'),
                }));
                setBookings(updatedUBooking)
            } else {
                toast.error(upcomming.data.message);
            }


        } catch (error) {
            console.error('Error fetching upcoming bookings:', error);
            toast.error('An error occurred while fetching upcoming bookings');
        }

    };
    const [refresh, setRefresh] = useState<boolean>(false);


    const handleCancelBooking = async (bookingId: string) => {
        try {
         
            const status = 'cancelled'
            const response = await Api.post('/doctor/updateBookingStatus', { bookingId, status });

            if (response.data.success) {

                toast.success(response.data.message)
                setRefresh((prev) => !prev);
            } else {
                toast.error(response.data.message)
            }


        } catch (error) {
            toast.success((error as Error).message)

        }
    }

   const handleCompleteBooking=async(bookingId:string)=>{
    try {
      
        const status = 'completed'
        const response = await Api.post('/doctor/updateBookingStatus', { bookingId, status });

        if (response.data.success) {
            toast.success(response.data.message)
            setRefresh((prev) => !prev);
        } else {
            toast.error(response.data.message)
        }
        Upcomming()
    } catch (error) {
        toast.success((error as Error).message)

    }
   }


    useEffect(() => {

        Upcomming();

    }, [refresh])








    return (
        <>
            <Toaster />

            <div className='flex flex-col min-h-screen bg-gray-400'>
                <div className='bg-[#202231] w-full h-16'></div>
                <div className='flex flex-1'>
                    <div className=' bg-[#202231]'>
                        <DocNavbar />
                    </div>
                    <div className='w-full bg-gray-400'>
                        <Booked Bookings={Books} handleCancelBooking={handleCancelBooking} handleCompleteBooking={handleCompleteBooking}/>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Bookings
