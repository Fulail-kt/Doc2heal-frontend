import { FC, useEffect } from 'react'
import Adminheader from '../../components/Header/AdminHeader'

const AdminDashboard: FC = () => {
  useEffect(() => {

  }, [])
  return (
    <>
      <Adminheader />
      <div className='w-full flex justify-center mt-12 '>

        <div className='w-1/2 flex justify-center gap-x-10'>
          <div className='w-1/2 bg-gray-400 h-48 rounded-md'></div>
          <div className='w-1/2 bg-gray-400 h-48 rounded-md'></div>
        </div>

      </div>
    </>
  )
}

export default AdminDashboard
