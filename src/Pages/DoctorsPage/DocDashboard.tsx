import {FC} from 'react'
import DocNavbar from '../../components/Navbar/DocNavbar'
import { useNavigate } from 'react-router-dom'

const DocDashboard:FC = () => {

  const navigate=useNavigate()

  const Logout=()=>{

    localStorage.removeItem('token'); 
    navigate('/')
    
  }
  return (
    <div>
      <div className='bg-gray-900 overflow-y-auto h-12'><img src="" alt="Logo" /></div>
      <div className=''>
        <div className='flex w-full justify-center'>
          <div className='min-h-[650px]  flex flex-col items-center justify-center bg-gray-900 w-[13%]'>
            <div className=' w-full flex justify-center'><DocNavbar  /></div>  
            <div className='m-0 text-center  items-end h-[200px] flex justify-center w-[100px]'>
              <button className='bg-blue-400 h-10 p-2 w-100 rounded-md text-white' onClick={Logout}>Log Out</button>
              </div>
          </div>
          <div className='bg-transparent bg-gray-300 w-full flex justify-center'>
            <div className='flex gap-x-10 mt-10 w-1/2'>
              <div className='border bg-slate-500 w-1/2 rounded-md h-48'></div>
              <div className='border bg-slate-600 w-1/2 rounded-md h-48'></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default DocDashboard
