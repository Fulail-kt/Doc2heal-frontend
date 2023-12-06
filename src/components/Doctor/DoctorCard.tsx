import { Link } from 'react-router-dom'
import defaultImg from '../../assets/images/placeholder-doctor-male.jpg'


// import {BsArrowRight} from 'react-icons/bs'
interface Doctor {
    _id:string,
    username?: string;
    specialization?: string;
    image?: string;
    hospital?: string;
    patients?:number
  }
  
  interface DoctorCardProps {
    doctor: Doctor;
  }
  
  const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
    const {username}=doctor
  return (
    <div>
        <Link to='/doctor/id'>
      <div>
      <img src={ defaultImg} className="w-100 rounded-md" alt="" />
      </div>
      <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-slate-800 font-[700] mt-3 lg:mt-5">{username}</h2>
      <div className="mt-2 lg:mt-4 flex items-center justify-between">
        <span className='bg-[#ccf0f3] text-cyan-500 py-1 px-2 lg:py-2 lg:px-6 text-[18px] leading-4
         lg:text-[16px] lg:leading-7 font-semibold'>ap</span>
         <div className='flex items-center gap-[60px]'>
            <span className='flex items-center gap-[60px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-slate-800'>4.1</span>
<span className='text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-slate-700'>(45)</span>
         </div>
      </div>

      <div className='mt-[18px] lg:mt-5 flex items-center justify-between'>
        <div>
            <h3 className='text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-slate-800'>+patients</h3>
            <p className='text-[14px] leading-6 font-[400] text-slate-700 '>At abc hospital </p>
        </div>
      </div>
      </Link>
    </div>
  )
}

export default DoctorCard
