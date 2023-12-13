import { useParams } from "react-router-dom"
import DoctorsList from "../../components/Doctor/DoctorsList"
import Header from "../../components/Header/Header"
import User from '../../@types';
import bookingModal from '../../@types';
import Api from "../../services/api"
import { useEffect, useState } from "react"
import Timeslot from "../../components/Doctor/time";

const DoctorsDetails:React.FC =()=> {


  

  const {id}=useParams()
  const [doctor, setDoctor] = useState<User | undefined>();
  const [bookings, setBookings] = useState<bookingModal | undefined>()
  const fetchData = async () => {
    try {
      const response = await Api.get(`/getuser`, { params: { id } });
      const slots = await Api.get('/getbookings', { params: { id } });
  
      console.log(response.data.user);
      console.log(slots.data);
  
      setDoctor(response.data?.user);
      setBookings(slots.data?.bookings); // Use setBookings to set the bookings state
  
    } catch (error) {
      // Handle errors if any
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(()=>{

    fetchData();
  },[])



  return (
    <>
    <Header/>
      <DoctorsList doctor={doctor}/>
      <Timeslot bookings={bookings}/>
    </>
  )
}

export default DoctorsDetails
