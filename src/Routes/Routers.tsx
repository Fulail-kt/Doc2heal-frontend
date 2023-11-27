import {FC} from 'react'
import {Routes,Route} from 'react-router-dom'
// User pages
import Home from '../Pages/Home'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import Profile from '../Pages/Profile'
import DoctorsDetails from '../Pages/DoctorsDetails'
import Doctors from '../Pages/Doctors'
import Otp from '../Pages/otp'

// Doctor pages

const Routers:FC=()=> {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup'element={<Signup/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/doctors'element={<Doctors/>}/>
      <Route path='/doctors/:id' element={<DoctorsDetails/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/otp' element={<Otp/>}/>
  </Routes>
  )
}

export default Routers
