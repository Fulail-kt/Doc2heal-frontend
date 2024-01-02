

import { useParams } from "react-router-dom";
import DoctorsList from "../../components/Doctor/DoctorsList";
import Header from "../../components/Header/Header";
import User from "../../@types";
import bookingModal from "../../@types";
import Api from "../../services/api";
import { useEffect, useState } from "react";
import Timeslot from "../../components/Doctor/time";
import { current } from "@reduxjs/toolkit";
import moment from "moment";

const DoctorsDetails: React.FC = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<User | undefined>();
  const [bookings, setBookings] = useState<bookingModal[] | undefined>();
  const [showBookings, setShowBookings] = useState(false);

  const currentDate = moment().format('YYYY-MM-DD');
  const [selected, setSelected] = useState(currentDate);

  const fetchData = async () => {
    try {
      const response = await Api.get(`/doctor/getdoctor`, { params: { id } });
      setDoctor(response.data?.doctor.doctor);

    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

  // const fetchBookings = async () => {
  //   try {
  //     const slots = await Api.get("/getbookings", { params: { id } });
  //     const allBookings: bookingModal[] = slots.data.bookings;
  //     const filteredBookings = allBookings.filter(
  //       (item) => item.status === "booked" || item.status === "pending"
  //     ).filter((item)=>{
  //       const currentTime=moment()
  //       return  currentTime.isAfter(item?.end)
  //     })
  //     setBookings(filteredBookings);
  //   } catch (error) {
  //     console.error("Error fetching bookings:", error);
  //   }
  // };


  console.log(selected, "ds");


  const fetchBookings = async () => {
    try {
      // const selected="2024-01-02"
      const slots = await Api.get("/getbookings", { params: { id, selected } });
      const allBookings: bookingModal[] = slots.data.bookings;

      console.log(slots.data, "daa");


      const filteredBookings = allBookings.filter((item) => {
        const currentTime = moment();
        const isAfterEndTime = currentTime.isBefore(item?.end);
        const isBookedOrPending = item?.status === "booked" || item?.status === "pending";
        // const isToday = moment(item?.date).isSame(currentTime, 'day');
        const isTodayOrLater = moment(item?.date).isSameOrAfter(currentTime, 'day');
        return isBookedOrPending && isTodayOrLater && isAfterEndTime;
      });

      setBookings(filteredBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };



  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    fetchBookings()
  }, [selected])

  const handleSeeAvailableSlots = () => {
    fetchBookings();
    setShowBookings(!showBookings);
  };

  return (
    <>
      <Header />
      <div className="profile_bg" style={{ minHeight: 'calc(100vh - 100px)' }}>
        <DoctorsList doctor={doctor} />
        <div className="flex justify-center gap-x-6 w-full text-white">

          <button className="bg-[#edc77b] p-1 w-[250px] px-10 rounded-full text-xl font-extralight" onClick={handleSeeAvailableSlots}>
            {showBookings ? "Hide Available Slots" : "See Available Slots"}
          </button>
          <input type="date" defaultValue={currentDate} onChange={(e: any) => setSelected(e.target.value)} className="bg-[#edc77b] outline-none rounded-full p-0 m-0 px-3 py-1" name="" id="" />
        </div>
        {showBookings && <Timeslot bookings={bookings} />}
      </div>

    </>
  );
};

export default DoctorsDetails;
