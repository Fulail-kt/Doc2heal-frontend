

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/User/Home'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import Doctors from '../Pages/User/Doctors'
import DoctorsDetails from '../Pages/User/DoctorsDetails';
import Profile from '../Pages/User/Profile'
// import Room from '../Pages/Room'
import NotFound from '../components/404/404'
import Otp from '../Pages/User/otp'
import ProtectedRoute from './Protected'
import Application from '../Pages/DoctorsPage/Application'
import Mybookings from '../Pages/User/Mybookings'
// import Chat from '../components/Conversation/Conversation'
import Messenger from '../Pages/CommonPage/Messages/Messenger'
import VideoCall from '../components/VideoCall/VideoCall'

const UserRoutes:React.FC = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path="/otp" element={<Otp/>} />
      <Route path='/doctors' element={<Doctors/>}/>
      <Route path='/doctors/:id' element={<DoctorsDetails/>}/>



// Protected


<Route path='/application' element={<Application />}/>
<Route path='/profile' element={<ProtectedRoute allowedRole="patient"><Profile /></ProtectedRoute>} />
<Route path='/appointments' element={<ProtectedRoute allowedRole="patient"><Mybookings /></ProtectedRoute>} />
<Route path='/messages' element={<ProtectedRoute allowedRole="patient"><Messenger /></ProtectedRoute>} />

      <Route path="/room/:id" element={<VideoCall/>} />
      <Route path="/success" element={<h1>this is scucesss</h1>} />


      <Route path="/*" element={<NotFound/>} />


    </Routes>
      
    </>
  )
}

export default UserRoutes
