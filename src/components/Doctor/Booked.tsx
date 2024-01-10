import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import socket from '../../services/socket';
import Booking from '../../@types';
import Spinner from '../Spinner/Spinner';
import Modal from '../modal/modal';
import Api from '../../services/api';
import toast, { Toaster } from 'react-hot-toast';

const Booked = ({ Bookings, handleCancelBooking, handleCompleteBooking }: { Bookings: Booking[]; handleCancelBooking: any; handleCompleteBooking: any }) => {
  const [page, setPage] = useState('upcoming');
  const [uBooking, setUbooking] = useState<Array<Booking>>();
  const [cBooking, setCbooking] = useState<Array<Booking>>();
  const [fBooking, setFbooking] = useState<Array<Booking>>();
  const [loading, setLoading] = useState<boolean>(true);
  const [roomId, setRoomId] = useState('');
  const [selected, setSelected] = useState("")
  const [prescription, setPrescription] = useState("")

  const location = useLocation();
  const navigate = useNavigate();


  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = (booking: any) => {
    setSelected(booking._id)
    setPrescription(booking?.prescription)
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelected("")

  };

  const handleUpcomingClick = () => {
    setPage('upcoming');
  };

  const handleCompletedClick = () => {
    setPage('completed');
  };

  const handleCancelledClick = () => {
    setPage('cancelled');
  };

  const filter = () => {
    setLoading(true);

    const upcom = Bookings?.filter((bk: { status: string }) => bk.status === 'booked');
    setUbooking(upcom);

    const completed = Bookings?.filter((bk: { status: string }) => bk.status === 'completed');
    setFbooking(completed);

    const cancelled = Bookings?.filter((bk: { status: string }) => bk.status === 'cancelled');
    setCbooking(cancelled);

    setLoading(false);
  };

  useEffect(() => {
    filter();
  }, [Bookings]);

  const showSessionStartButton = (bookingTime: moment.MomentInput, bookingEnd: moment.MomentInput) => {
    const startTime = moment(bookingTime, 'h:mm A');
    const endTime = moment(bookingEnd, 'h:mm A');
    const currentTime = moment();
    const isAfterStartTime = currentTime.isSameOrAfter(startTime);
    const isBeforeEndTime = currentTime.isSameOrBefore(endTime);
    return isAfterStartTime && isBeforeEndTime;
  };

  const handleStartSession = useCallback((e: React.MouseEvent, bookId: string) => {
    e.preventDefault();
    setRoomId(bookId);
    const roomId = bookId
    socket.emit('room:join', { email: 'hello', roomId });
    handleJoinRoom({ email: 'hello', roomId });
  }, [roomId]);


  const handleJoinRoom = useCallback((data: { email: string; roomId: string }) => {
    const { roomId } = data;

    navigate(`/room/${roomId}`);
  }, [navigate]);

  useEffect(() => {
    socket.on('room:join', handleJoinRoom);
    return () => {
      socket.off('room:join', handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);



  const cancelButton = (bookingTime: moment.MomentInput) => {
    // const startTime = moment(bookingTime, 'h:mm A');
    // const currentTime = moment();
    // // currentTime.format('h:mm A')
    // // console.log(startTime,currentTime);
    // const currentDate=moment()
    // console.log(startTime.format('h:mm A'), currentTime.format('h:mm A'));


    const startTime = moment(bookingTime, 'h:mm A');

    const showCancel=startTime.subtract(1, 'hour')
 
    const currentTime = moment();
    const isBeforeStart = currentTime.isSameOrBefore(startTime);
    // const isBeforeEndTime = currentTime.isSameOrBefore(endTime);

    
    return  isBeforeStart;
    
    // return currentTime.isBefore(startTime.subtract(1, 'hour'));
  };
  

  // const CompletedButton = (bookingTime: moment.MomentInput) => {
  //   const endTime = moment(bookingTime, 'h:mm A');
  //   const currentTime = moment();
  //   return currentTime.isAfter(endTime);
  // };

  const CompletedButton = (bookingEnd: moment.MomentInput, date: moment.MomentInput) => {
    const endTime = moment(`${date} ${bookingEnd}`, 'YYYY-MM-DD h:mm A'); // Combine date and time
    const currentTime = moment();

    return currentTime.isAfter(endTime);
  };


  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleSubmit = async (e: any) => {

    e.preventDefault()
    try {
      const res = await Api.post('/doctor/prescription', { prescription, selected })

      toast.success(res.data.message)

    } catch (error) {

    }
  }

  return (
    <>
    <Toaster/>
      <div className='flex justify-center text-[10px] sm:text-sm'>
        <div className='w-[90%] flex h-12 items-center bg-gray-500 rounded-3xl mt-5 justify-around cursor-pointer'>
          <span
            onClick={handleUpcomingClick}
            className={`w-1/3 text-center select-none ${page === 'upcoming' ? 'bg-gray-800 p-3 rounded-full shadow-lg text-white font-medium ' : ''}`}
          >
            Upcoming
          </span>
          <span
            onClick={handleCompletedClick}
            className={`w-1/3 text-center select-none ${page === 'completed' ? 'bg-gray-800 p-3 rounded-full shadow-lg text-white font-medium ' : ''}`}
          >
            Completed
          </span>
          <span
            onClick={handleCancelledClick}
            className={`w-1/3 text-center select-none ${page === 'cancelled' ? 'bg-gray-800 p-3 rounded-full shadow-lg text-white font-medium ' : ''}`}
          >
            Cancelled
          </span>
        </div>
      </div>
      {/* {Bookings && Bookings.length&& <p></p>} */}

      <div className='mt-4 flex justify-center'>
        {page === 'upcoming' && (
          <>
            {loading ? (
              <Spinner />
            ) : (
              <div className='w-[85%] flex flex-col justify-center items-center cursor-default '>
                {uBooking && uBooking?.length < 1 ? (<p className="font-mono font-bold text-2xl text-gray-800">No Any Upcomming Bookings</p>) : (uBooking?.map((ubook: { note: string; userName: string; userAge: number; _id: string; time: string; end: string; date: string; doctorId: any }) => (
                  <div key={ubook._id} className='w-[90%] flex flex-col text-center justify-center items-center border m-2 rounded-md shadow-lg'>
                    <div>
                      {location.pathname === '/doctor/bookings' ? (
                        <>
                          <p className='text-lg font-mono'>Session with {capitalizeFirstLetter(ubook?.userName)} ({ubook?.userAge})</p>
                          <p className='text-center'>{ubook?.note}</p>
                        </>
                      ) : (<>
                        <p className='text-lg font-mono'>Session with {capitalizeFirstLetter(ubook?.doctorId?.username)}</p>

                      </>)}
                    </div>
                    <div className='w-[70%] rounded-lg p-2 px-5 bg-gray-500 text-white justify-around  m-3 items-center  flex' key={ubook?._id}>
                      <p>{new Intl.DateTimeFormat('en-IN').format(new Date(ubook?.date))}</p>
                      <p>
                        {ubook?.time} to {ubook?.end}
                      </p>
                      {showSessionStartButton(ubook?.time, ubook?.end) && (
                        <button onClick={(e) => handleStartSession(e, ubook?._id)} className='btn bg-green-600 p-2 mt-0'>
                          Start Session
                        </button>
                      )}
                      {cancelButton(ubook?.time) && (
                        <button onClick={() => handleCancelBooking(ubook?._id)} className='btn bg-red-600 p-2 mt-0'>
                          Cancel Booking
                        </button>
                      )}
                      {location.pathname == "/doctor/bookings" && CompletedButton(ubook?.end, ubook?.date) && (
                        <button onClick={() => handleCompleteBooking(ubook?._id)} className='btn bg-green-600 p-2 mt-0'>
                          Complete
                        </button>
                      )}
                    </div>
                  </div>
                )))
                }
              </div>
            )}
          </>
        )}

        {page === 'completed' && (
          <>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className='w-[85%] flex flex-col justify-center items-center  '>
                {fBooking && fBooking?.length < 1 ? (<p className="font-mono font-bold text-2xl text-gray-800">No Any Completed Bookings </p>) : (fBooking?.map((fbook) => (
                  <div className='w-[70%] rounded-lg p-2 px-5 bg-gray-500 text-white justify-around border m-3 items-center  flex'>
                    <div className=' w-[75%] rounded-lg p-2 px-5 bg-gray-500 text-white justify-around border m-3 items-center  flex' key={fbook?._id}>
                      <p>{new Intl.DateTimeFormat('en-IN').format(new Date(fbook.date))}</p>
                      <p>
                        {fbook.time} to {fbook.end}
                      </p>
                      <p className='text-white bg-green-600 rounded-md p-1'>{fbook.status}</p>
                    </div>
                    <div><span className='cursor-pointer bg-gray-800 rounded-full px-3 py-2' onClick={() => openModal(fbook)}>Prescription</span></div>
                  </div>
                )))}
              </div>
            )}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <div className='w-[500px] flex flex-col'>
                <h1 className='text-center py-2 text-xl font-medium'>Prescription</h1>
                <div className='w-full flex flex-col'>
                  <form action="" onSubmit={(e) => handleSubmit(e)}>
                    <textarea
                      className={`${location.pathname == "/appointments" ? "read-only w-full" : "w-full"}  border-2`}
                      value={prescription}
                      onChange={(e) => setPrescription(e.target.value)}
                      name=""
                      id=""
                    ></textarea>
                    {location.pathname == "/doctor/bookings" && <div className='w-full justify-center flex'>
                      <button className='bg-gray-800 text-white rounded-full px-4 py-1'>Submit</button>
                    </div>}
                  </form>
                </div>
              </div>
            </Modal>
          </>
        )}

        {page === 'cancelled' && (
          <>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className='w-[85%] flex flex-col justify-center items-center '>
                {cBooking && cBooking.length < 1 ? (<p className="font-mono font-bold text-2xl text-gray-800">No Any Cancelled Bookings</p>) : (cBooking?.map((cbook) => (
                  <>
                    <div>
                      {location.pathname === '/doctor/bookings' && (
                        <>
                          <p className='text-lg font-mono'>Session with {capitalizeFirstLetter(cbook.userName)} ({cbook.userAge})</p>
                          <p className='text-center'>{cbook.note}</p>
                        </>
                      )}
                    </div>

                    <div className=' w-[70%] rounded-lg p-2 px-5 bg-white justify-around border m-3 items-center text-black flex' key={cbook?._id}>
                      <p>{new Intl.DateTimeFormat('en-IN').format(new Date(cbook.date))}</p>
                      <p>
                        {cbook.time} to {cbook.end}
                      </p>
                      <p className='text-white bg-red-600 rounded-md p-1'>{cbook.status}</p>
                    </div>
                  </>
                )))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Booked
