import {FC} from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header'

const Profile:FC = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleLogout=(event:any)=>{
     event.stopPropagation();
    dispatch(logout())
    localStorage.clear()
    navigate('/', { replace: true })
  }

  return (
    <div>
      <Header/>
      <section className='bg-[#fff9ea] pt-2 pb-2'>

        <div>
          <Navbar/>
      <button onClick={handleLogout}>Logout</button>
      

        </div>
      </section>
      


    
    </div>
  )
}

export default Profile
