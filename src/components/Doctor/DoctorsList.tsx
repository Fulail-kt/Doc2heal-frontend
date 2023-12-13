import React from 'react';
// import Modal from '../modal/modal';
// import BookingForm from './time';
import User from '../../@types';

const DoctorsList: React.FC<{ doctor: User }> = ({ doctor }) => {



  console.log(doctor,"from doc");

  if(!doctor){
    return <p>empty</p>
  }
  


  return (
    <section className=''>
      <div className='flex justify-center'>
        <div className='bg-blue-300 flex flex-col items-center justify-center px-2 rounded-md shadow-xl shadow-stone-400 border-2 w-52 h-60'>
            <img src={doctor?.image} className='h-100 ' alt="" />
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='rounded-md text-center flex flex-col justify-center items-center w-52 mt-3'>
          <h1 className='py-1 text-lg font-medium '>Dr.{doctor?.username}</h1>
          <p className='bg-cyan-300 w-32 py-1 rounded-sm text-sm text-white'>{doctor?.specialization}</p>
          <p className='py-1 font-mono'>at <span className=''>{doctor?.hospital}</span></p>
          

        </div>
      </div>
    </section>
  );
};

export default DoctorsList;
