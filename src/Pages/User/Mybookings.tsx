import {FC, useEffect, useState} from 'react'
import Booked from '../../components/Doctor/Booked'
import Api from '../../services/api'
import toast from 'react-hot-toast'
import Booking from '../../@types'
import moment from 'moment'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'

const Mybookings:FC = () => {


    const [loading,setLoading]=useState(true)
    const [books,setBooked]=useState<Array<Booking>>()



    
    
    

   const fetchData=async()=>{
    try {
        const mybookings=await Api.get('/getAllbookings')

        // console.log(mybookings);
        if(mybookings.data.success){

          const BookedBookings = mybookings.data.bookings.map((ubook:{time:Date,end:Date}) => ({
            ...ubook,
            time: moment(ubook.time).subtract(5, 'hours').subtract(30, 'minutes').format('hh:mm A'),
            end: moment(ubook.end).subtract(5, 'hours').subtract(30, 'minutes').format('hh:mm A'),
        }));

          setBooked(BookedBookings)
          console.log(mybookings.data,"dks")

          setLoading(false)
        }else{
          toast.error(mybookings.data?.message)
        }
        
    } catch (error) {
        toast.error("some error occured")
    }
   }

   useEffect(()=>{
     fetchData()
   },[])

   console.log(books);

   return (
    <>
    <Header/>
    <div className='flex w-full'>
      <div>
      <Navbar handleLogout={false}/>
      </div>
      <div className='w-full'>
         <h1 className='text-center'>my bookings</h1>
        <Booked Bookings={books}/>
      </div>
    </div>
    </>
  )
}

export default Mybookings
