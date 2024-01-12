import { FC, useEffect, useState } from 'react'
import Booked from '../../components/Doctor/Booked'
import Api from '../../services/api'
import toast from 'react-hot-toast'
import Booking from '../../@types'
import moment from 'moment'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'

const Mybookings: FC = () => {

  const [books, setBooked] = useState<Array<Booking>|any>()
  const [referesh,setRefresh]=useState(false)



  const fetchData = async () => {
    try {
      const mybookings = await Api.get('/getAllbookings')
      if (mybookings.data.success) {

        const BookedBookings = mybookings.data.bookings.map((ubook: { time: Date, end: Date }) => ({
          ...ubook,
          time: moment(ubook.time).subtract(5, 'hours').subtract(30, 'minutes').format('hh:mm A'),
          // time: moment(ubook.time).format('hh:mm A'),
          // end: moment(ubook.end).format('hh:mm A'),
          end: moment(ubook.end).subtract(5, 'hours').subtract(30, 'minutes').format('hh:mm A'),
        }));

        setBooked(BookedBookings)

       
      } else {
        toast.error(mybookings.data?.message)
      }

    } catch (error) {
      toast.error("some error occured")
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchData()
  }, [referesh])

  const handleCancelBooking = async (bookingId:string) => {
    try {
      const status = 'cancelled'
      const response = await Api.post('/cancelBooking', { bookingId, status });

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

  return (
    <>
      <Header />
      <div className='flex w-full profile_bg flex-1 h-screen'>
        <div>
        <Navbar handleLogout={() => {}} />
        </div>
        <div className='w-full'>
          <Booked Bookings={books} handleCancelBooking={handleCancelBooking} handleCompleteBooking={false} />
        </div>
      </div>
    </>
  )
}

export default Mybookings
