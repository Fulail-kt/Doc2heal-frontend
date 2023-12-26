import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DocDashboard from '../Pages/DoctorsPage/DocDashboard'
import TimeSlots from '../Pages/DoctorsPage/TimeSlots'
import ProtectedRoute from './Protected'
import Bookings from '../Pages/DoctorsPage/Bookings'
import DocProfile from '../Pages/DoctorsPage/DocProfile'

import Messenger from '../Pages/CommonPage/Messages/Messenger'
import Lobby from '../components/lobby'

const DoctorRoutes = () => {
    return (
        <>
            <Routes>
         <Route path='/lobby' element={<Lobby />} />

         <Route path='/' element={<ProtectedRoute allowedRole="doctor"><DocDashboard /></ProtectedRoute>} />
         <Route path='/bookings' element={<ProtectedRoute allowedRole="doctor"><Bookings /></ProtectedRoute>} />
         <Route path='/timeslots' element={<ProtectedRoute allowedRole="doctor"><TimeSlots /></ProtectedRoute>} />
         <Route path='/profile' element={<ProtectedRoute allowedRole="doctor"><DocProfile /></ProtectedRoute>} />
         <Route path='/messages' element={<ProtectedRoute allowedRole="doctor"><Messenger /></ProtectedRoute>} />
            </Routes>
        </>
    )
}

export default DoctorRoutes
