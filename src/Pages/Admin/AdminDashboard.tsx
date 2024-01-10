import { FC, useEffect, useState } from 'react'
import Adminheader from '../../components/Header/AdminHeader'
import ChartExample from '../../components/Chart/Chart'
import Api from '../../services/api'
import doctorImg from '../../assets/images/edit.png'
import patientImg from '../../assets/images/patient.png'
import PieChart from '../../components/Chart/PieChart'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'


const AdminDashboard: FC = () => {
  const [earnings, setEarnings] = useState([])
  const [bookings, setbookings] = useState({})

  const navigate=useNavigate()

  const convertToShortMonth = (monthString: string) => {
    const [year, month] = monthString.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month, 10) - 1]}, ${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Api.get('/admin/totalEarnings')

        const data = res.data.result.map((entry: { month: string }) => ({
          ...entry,
          month: convertToShortMonth(entry.month)
        }));
        data.sort((a: { year: string }, b: { year: string }) => a.year.localeCompare(b.year));

        if(res?.data?.notAdmin){
          localStorage.removeItem('token')
          navigate('/')
        }
        setEarnings(data)
        setbookings(res.data.booking)
      } catch (error:any) {
        toast.error(error.message)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <div className='bg-gray-200 min-h-screen p-2'>
        <Adminheader />
        <div className=' flex flex-col items-center justify-center  mt-4 '>
          <div className='flex flex-col gap-y-2 md:gap-y-0 items-center w-full md:flex-row  md:w-3/4 justify-center md:gap-x-10'>
            <div className='w-[90%] md:w-1/2 bg-gray-500 h-100 md:h-96 p-2 rounded-md'><ChartExample data={earnings} /></div>
            <div className=' w-[90%] md:w-1/2 flex flex-col justify-around   gap-y-2 rounded-md'>
              <div className=' flex justify-around items-center cursor-default  bg-gray-500 h-40 rounded-md'>
                <div className='w-1/2 border flex justify-center items-center text-center font-semibold h-20' ><span><img src={doctorImg} width={60} height={50} alt="" /></span><h1>Doctors 7</h1></div>
                <div className='w-1/2 border flex items-center justify-center text-center font-semibold h-20'><span><img src={patientImg} width={60} height={50} className='' /></span><h1>Patients 3</h1></div>
              </div>
              <div className=' flex justify-around items-center   cursor-default bg-gray-500 h-40 rounded-md'>
                <div className='w-1/2 border grid place-items-center text-center font-semibold h-20' >Non Blocked 9</div>
                <div className='w-1/2 border grid place-items-center text-center font-semibold h-20'>Blocked 0</div>
              </div>
            </div>
          </div>
          <div className='flex flex-col-reverse items-center  gap-y-2 md:gap-y-0 w-full md:flex-row  md:w-3/4 justify-center md:gap-x-10'>
            <div className='w-[90%] md:w-1/2 flex flex-col justify-around  gap-y-2  rounded-md'>
              <div className=' flex justify-around items-center cursor-default  bg-gray-500 h-32 rounded-md'>
                <div className='w-1/2 border flex justify-center items-center text-center font-semibold h-14' ><span><img src={doctorImg} width={60} height={50} alt="" /></span><h1>Doctors 7</h1></div>
                <div className='w-1/2 border flex items-center justify-center text-center font-semibold h-14'><span><img src={patientImg} width={60} height={50} className='' /></span><h1>Patients 3</h1></div>
              </div>
              <div className=' flex justify-around items-center  cursor-default bg-gray-500 h-32 rounded-md'>
                <div className='w-1/2 border grid place-items-center text-center font-semibold h-14' >Non Blocked 9</div>
                <div className='w-1/2 border grid place-items-center text-center font-semibold h-14'>Blocked 0</div>
              </div>
            </div>
            <div className='w-[90%] md:w-2/4  bg-gray-500 h-100  gap-y-2 mt-2 md:mt-0 md:h-80 p-1 rounded-md'><PieChart data={bookings} /></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
