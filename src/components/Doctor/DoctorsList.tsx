import React from 'react';
// import Modal from '../modal/modal';
// import BookingForm from './time';
import User from '../../@types';

const DoctorsList: React.FC<{ doctor: User }> = ({ doctor }) => {


  if(!doctor){
    return <div className='w-full h-96 flex justify-center items-center'><h1>Doctor is not Available</h1></div>
  }
  
  return (
    <section className='pb-[30px] pt-[20px]'>
      <div className='flex justify-center'>
        <div className='bg-blue-300 flex flex-col items-center justify-center px-2 rounded-md shadow-xl shadow-stone-400 border-2 w-52 h-60'>
            <img src={doctor?.image} className='h-100 ' alt="" />
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='rounded-md text-center flex flex-col justify-center items-center w-52 mt-3'>
          <h1 className='py-1 text-lg font-medium '>Dr.{doctor?.username}</h1>
          <p className='bg-cyan-300 w-32 py-1 rounded-sm text-sm text-white'>{doctor?.specialization}</p>
          <p className='pt-1 font-mono'>at <span className=''>{doctor?.hospital}</span></p>
          <p className=' font-mono'><span className='p-0 m-0'>{doctor?.experience} years Experience</span></p>
        </div>
      </div>
    </section>
  );
};

export default DoctorsList;
