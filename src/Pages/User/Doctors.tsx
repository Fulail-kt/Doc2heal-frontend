import { FC, useEffect } from 'react';
import DoctorCard from '../../components/Doctor/DoctorCard';
import useApi from '../../hooks/useApi';
import Spinner from '../../components/Spinner/Spinner';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';


const Doctors: FC = () => {
  interface Doctor {
    _id: string;
    username: string;
    specialization: string;
    image: string;
    hospital: string;
    patients: number;
  }


  // const { fetchData, loading, data, error } = useApi<Doctor[]>('/getAllDoctors', 'get');
  const { fetchData, loading, data, error } = useApi<{ user: Doctor[] }>('/getAllUsers','get',"doctor");

  useEffect(() => {
    fetchData();
  }, []); 

  if (loading) {
    return <Spinner/>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const doctors: Doctor[] = data.user || [];

  console.log(data.user)


  

  return (
    <>
    <Header/>
   <div>
         <section className='bg-[#fff9ea] flex pt-2 pb-2'>
      <div className='sm:w-1/4 md:w-[5%]'><Navbar/></div>
          <div className='container w-100  text-center'>
            <h2 className='heading'>Find a Doctor</h2>
            <div className='max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between'>
            <input type="search" className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-slate-700' placeholder='Search Doctor' />
            <button className='btn mt-0 rounded-[0px] rounded-r-md'>Search</button>
            </div>
          </div>
         </section>
         <section>
              <div className='container'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                    {doctors.map((doctor)=>(
                <DoctorCard key={doctor._id} doctor={doctor}/>
              ))}
                </div>
              </div>
            </section>
       
     </div>
   </>
  )
}

export default Doctors
