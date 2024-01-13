import { FC, useEffect } from 'react'
import DocNavbar from '../../components/Navbar/DocNavbar'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'


const DisApproved: FC = () => {

  const navigate=useNavigate()
  const token=localStorage.getItem('token')
  useEffect(()=>{
if(token){
  const decode= jwtDecode<{ _id: string; role: string;isApproved:boolean}>(token);
  if(decode.isApproved){
    navigate('/')
  }
}
  },[navigate, token])
  const Logout=()=>{
    localStorage.removeItem('token'); 
    navigate('/')
    
  }
  return (
    <>
      <div className='bg-[#202231] w-full h-16'></div>
      <div className='flex overflow-hidden bg-gray-400'>
        <div className='flex-shrink-0'>
          <div><DocNavbar/></div>
          <div className='m-0 text-center items-end h-[200px] flex justify-center w-full bg-[#202231]'>
            <button className='bg-slate-900 px-5 m-5 h-10 p-2 w-100 rounded-md text-white' onClick={Logout}>Log Out</button>
          </div>
        </div>
        <div className='text-center flex-grow grid items-center text-red-600 overflow-auto'>
          <h1 className='text-xl font-semibold'>Admin disapproved You, please contact admin</h1>
          <p>Doc2heal.service@gmail.com</p>
        </div>
      </div>
    </>
  );
  
}

export default DisApproved
