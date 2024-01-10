import { FC, useEffect, useState, lazy, Suspense } from 'react';
// import DoctorCard from '../../components/Doctor/DoctorCard';
import useApi from '../../hooks/useApi';
import Spinner from '../../components/Spinner/Spinner';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice';
import User from '../../@types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const DoctorCard = lazy(() => import('../../components/Doctor/DoctorCard'));

const Doctors: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate('/', { replace: true });
  };

  const [date, setDate] = useState<string | undefined>('');
  const [doctors, setDoctors] = useState<User[]>([]);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedFeeRange,setSelectedFeeRange]=useState<string>("")

  const { fetchData: fetchUsers, loading: loadingUsers, data: userData, error: userError } = useApi<{ doctors: User[], totalPages: any }>(`/doctor/getAlldoctors?page=${currentPage}`, 'get');
  const { fetchData: fetchBookings, loading: loadingBookings, data: bookingData, error: bookingError } = useApi<any>('/doctor/getbookings', 'get');
  const users: User[] = userData.doctors || [];

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (userData) {
      setTotalPages(userData?.totalPages);
    }
  }, [userData]);

  useEffect(() => {
    fetchUsers();
    fetchBookings();
  }, [currentPage]);

  useEffect(() => {
    fetchBookings();
    setInitialLoadComplete(true);
  }, [date]);


  useEffect(() => {
    if (initialLoadComplete) {
      const updatedDoctors = users.filter((doc) => (
        doc.role === 'doctor' &&
        doc.isApproved &&
        (!date || isDoctorAvailableOnDate(doc._id, date))
      ));
  
      // Apply fee range filter
      if (selectedFeeRange === 'lowToHigh') {
        updatedDoctors.sort((a:any, b:any) => a?.fee - b?.fee);
      } else if (selectedFeeRange === 'highToLow') {
        updatedDoctors.sort((a:any, b:any) => b?.fee - a?.fee);
      }
  
      setDoctors(updatedDoctors);
    }
  }, [date, users, bookingData, initialLoadComplete, selectedFeeRange]);


  const isDoctorAvailableOnDate = (doctorId: string, selectedDate: string): boolean => {
    const bookings = bookingData.booking || [];
    const bookingArray = Array.isArray(bookings) ? bookings : [bookings];

    const bookingsOnDate = bookingArray.filter((booking: any) => (
      booking.doctorId === doctorId &&
      moment(booking.date).format('YYYY-MM-DD') === selectedDate
    ));
    return bookingsOnDate.length > 0;
  };

  if (loadingUsers || loadingBookings) {
    return <Spinner />;
  }

  if (userError || bookingError) {
    return <p>Error: {userError ? userError.message : bookingError?.message}</p>;
  }

  return (
    <>
      <Header />
      <div className='profile_bg'>
        <div className=' flex h-44'>
          <div className='sm:w-1/4 md:w-[5%]'><Navbar handleLogout={handleLogout} /></div>
          <div className='container w-100  text-center'>
            <h2 className='text-[30px] font-bold text-blue-500'>Find a Doctor</h2>
            <div className='max-w-[60%] mt-2 mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between'>
              <input type="search" className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-slate-700' placeholder='Search Doctor' />
              <button className="btn mt-0 rounded-[0px] rounded-r-md">
      <span className="hidden sm:inline">Search</span> {/* Display on medium and larger screens */}
      <FontAwesomeIcon icon={faSearch} className="sm:hidden w-5 h-5" />
    </button>
            </div>
            <div className='flex justify-center gap-x-2 sm:gap-x-10   sm:w-100 '>
              <select
                className='bg-blue-500 cursor-pointer p-1 px-1 rounded-md text-white mt-3 w-14 sm:w-24 focus:outline-none'
                value={selectedFeeRange} 
                onChange={(e) => setSelectedFeeRange(e.target.value)}
              >
                <option value="" disabled>Fee</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
              <div className='flex'><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className=' m-0 bg-blue-500 rounded p-1 mt-3 outline-none text-sm text-white h-8 w-14 sm:w-28' /></div>
            </div>
          </div>
        </div>
        <section className='p-0'>
          <div className='container'>
            <div className='grid grid-cols-2 m-4  md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {doctors.map((doctor) => (
              <div key={doctor._id} className=' shadow-lg shadow-slate-400 p-2 px-0 rounded-md flex justify-center'>
                <Suspense fallback={<Spinner />}>
                  <DoctorCard doctor={doctor} />
                </Suspense>
              </div>
            ))}
            </div>
          </div>
          <div className='flex justify-center'>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
              </svg>
            </button>
            <span className='mx-2'>Page {currentPage} of {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
              </svg>
            </button>
          </div>

        </section>
      </div>
    </>
  );
}

export default Doctors;
