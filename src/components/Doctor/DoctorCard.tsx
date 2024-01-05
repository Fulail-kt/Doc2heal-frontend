import { Link } from 'react-router-dom'
import defaultImg from '../../assets/images/placeholder-doctor-male.jpg'


// import {BsArrowRight} from 'react-icons/bs'
interface Doctor {
  _id: string,
  username?: string;
  specialization?: string;
  image?: string;
  hospital?: string;
  patients?: number
}

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }:{doctor:any}) => {
  const { username, _id, specialization, hospital } = doctor
  return (
    <div className='w-3/4'>
      <Link to={`/doctors/${_id}`}>
        <div>
          <img src={doctor.image?doctor.image:defaultImg} className="w-100 rounded-md" alt="" />
        </div>
        <h2 className="text-[12px]  text-center sm:text-[13px] md:text-[18px]  lg:text-[24px] text-slate-800  font-[700] mt-1 lg:mt-2">Dr.{username}</h2>
        <div className="mt-2 lg:mt-3  sm:flex md:flex lg:flex  gap-x-4 justify-between">
          <span className='bg-[#ccf0f3] md:w-36 lg:w-[36] rounded-sm text-cyan-500 py-1 px-1 lg:py-1 lg:px-2 text-[10px] 
         lg:text-[16px] lg:leading-7 font-semibold'>{specialization}</span>
          {/* <div className='flex items-center sm:gap-x-1 md:gap-[15px]'>
            <span className='flex items-center text-[14px] leading-3 lg:text-[16px] lg:leading-4 font-semibold text-slate-800'>4.1</span>
            <span className='text-[14px] leading-3 lg:text-[16px] lg:leading-4 font-semibold text-slate-700'>(45)</span>
          </div> */}
        </div>

        <div className='mt-[10px]  flex items-center justify-between'>
          <div className='flex justify-center flex-col w-full'>
            <h3 className=' text-[10px]  leading-4 sm:text-[14px] md:text-[16px]  font-normal text-slate-800'>{doctor?.patients?.length} patients</h3>
            <p className='text-[10px] sm:text-[14px] md:text-[16px] leading-6 font-[400] text-slate-700 '>{hospital}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default DoctorCard
