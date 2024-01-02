import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DocDashboard from '../Pages/DoctorsPage/DocDashboard'
import TimeSlots from '../Pages/DoctorsPage/TimeSlots'
import ProtectedRoute from './Protected'
import Bookings from '../Pages/DoctorsPage/Bookings'
import DocProfile from '../Pages/DoctorsPage/DocProfile'

import Messenger from '../Pages/CommonPage/Messages/Messenger'
import Lobby from '../components/lobby'
import DisApproved from '../Pages/DoctorsPage/DisApproved'
import DocPayment from '../Pages/DoctorsPage/DocPayment'

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
         <Route path='/payments' element={<ProtectedRoute allowedRole="doctor"><DocPayment /></ProtectedRoute>} />
         <Route path="/disapproved" element={<DisApproved/>} /> </Routes>
        </>
    )
}

export default DoctorRoutes
