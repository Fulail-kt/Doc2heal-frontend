import { FC, useEffect, useState, lazy, Suspense } from 'react'
import DocNavbar from '../../components/Navbar/DocNavbar'
import { useNavigate } from 'react-router-dom'
import Api from '../../services/api'
import { jwtDecode } from 'jwt-decode'
import Spinner from '../../components/Spinner/Spinner'
const PieChart =lazy(()=> import('../../components/Chart/PieChart'))
const ChartExample = lazy(() => import('../../components/Chart/Chart'));
import { FaSignOutAlt } from 'react-icons/fa';
import logo from '../../assets/images/Untitled (2).png'


type Token = {
  id: string,
  role: string
}
const DocDashboard: FC = () => {

  const [data, setData] = useState<any>([]);
  const [booking, setbooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const token: any = localStorage.getItem('token')
    const decode: Token | null | any = jwtDecode<Token>(token);
    const fetchData = async () => {
      const res = await Api.get(`/doctor/totalEarnings/${decode.id}`);
      const modifiedData: any = res.data.data.map((entry: { month: string }) => ({
        ...entry,
        month: convertToShortMonth(entry.month)
      }));
      modifiedData.sort((a: { year: string }, b: { year: string }) => a.year.localeCompare(b.year));

      const patient = res?.data?.patient;
      setbooking(res.data.booking)
      const totalEarnings = modifiedData.reduce((total: any, item: any) => total + item.totalEarnings, 0);

      setData({ modifiedData, patient, totalEarnings });
      setLoading(false)
    };

    const convertToShortMonth = (monthString: string) => {
      const [year, month] = monthString.split('-');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${monthNames[parseInt(month, 10) - 1]}, ${year}`;
    };
    fetchData();
  }, [])

  const Logout = () => {
    localStorage.removeItem('token');
    navigate('/')
  }

  return (
    <div className='bg-gray-400'>
      <div className='bg-[#202231] overflow-y-auto h-16'><div className='w-full items-center h-full md:w-48 flex justify-center'><img className=''  src={logo} width={160}  alt="Logo" /></div></div>
      <div className=''>
        <div className='flex w-full justify-center'>
          <div className='bg-[#202231]'>
            <div><DocNavbar /></div>
            <div className='m-0 text-center items-end h-[200px] flex justify-center bg-[#202231]'>
      <button className='bg-slate-900 px-5 m-5 h-10 p-2 w-100 rounded-md text-white' onClick={Logout}>
        <span className='hidden sm:inline-block'>Log Out</span>
        <span className='sm:hidden'><FaSignOutAlt /></span>
      </button>
    </div>
          </div>
          <div className='w-full flex justify-center '>
            <div className='bg-transparent bg-gray-300 w-full  flex flex-col justify-center'>
              <div className='flex flex-col items-center sm:flex sm:flex-row sm:items-start md:flex-row md:items-start gap-x-4 mt-1 m-3 '>
                <div className=' bg-slate-700 w-[90%] sm:w-1/2 md:w-1/2 rounded-md h-96 shadow-2xl '>
                  <Suspense fallback={<Spinner />}>
                    {loading ? <Spinner /> : <ChartExample data={data.modifiedData} />}
                  </Suspense>
                </div>
                <div className=' bg-slate-700 w-[90%] sm:w-[50%] md:w-[50%] rounded-md h-56 flex mt-1 md:mt-0 sm:mt-0 justify-evenly px-2 items-center'>
                  <div className=' m-1 h-28 rounded-md w-1/2 text-2xl font-extrabold font-serif text-white text-center flex flex-col justify-center items-center'><span className='flex justify-center'><img width={90} height={40} src="https://png.pngtree.com/png-vector/20220630/ourmid/pngtree-business-acounting-money-logo-vector-cash-logo-background-vector-png-image_37464228.png" alt="" /></span><h1>Total Revenue </h1> <span className=' p-2 rounded-md'>₹ {data?.totalEarnings}</span></div>
                 
                </div>
              </div>
              <div className='flex flex-col-reverse items-center sm:flex sm:flex-row sm:items-start md:flex-row md:items-start gap-x-4 mt-0 m-3'>
                <div className=' bg-slate-700 w-[90%] sm:w-[50%] md:w-[50%] rounded-md h-56 flex  justify-evenly px-2 items-center'>
                  <div className=' m-1 h-28 rounded-md w-1/2 text-2xl font-extrabold font-serif text-white text-center flex flex-col justify-center items-center'><span className='flex justify-center'><img width={80} height={40} src="https://cdn-icons-png.flaticon.com/512/718/718339.png" alt="" /></span><h1>Total Patients </h1> <span className=' p-2 rounded-md'> {data?.patient}</span></div>
                </div>
                <div className=' bg-slate-700 relative right-0 mb-1 mt-1 sm:mb-0 md:mb-0  w-[90%] sm:mt-[-36%] md:mt-[-26%] lg:mt-[-14%] md:w-[49%] sm:w-[49%]  rounded-md h-96 shadow-2xl   '>
                  <Suspense fallback={<Spinner />}>
                    {loading ? <Spinner /> : <PieChart data={booking} />}
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocDashboard
