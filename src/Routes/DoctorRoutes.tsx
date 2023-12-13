import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DocDashboard from '../Pages/DoctorsPage/DocDashboard'
import TimeSlots from '../Pages/DoctorsPage/TimeSlots'
import ProtectedRoute from './Protected'
import Bookings from '../Pages/DoctorsPage/Bookings'

const DoctorRoutes = () => {
    return (
        <>
            <Routes>
         <Route path='/' element={<ProtectedRoute allowedRole="doctor"><DocDashboard /></ProtectedRoute>} />
         <Route path='/bookings' element={<ProtectedRoute allowedRole="doctor"><Bookings /></ProtectedRoute>} />
         <Route path='/timeslots' element={<ProtectedRoute allowedRole="doctor"><TimeSlots /></ProtectedRoute>} />
            </Routes>
        </>
    )
}

export default DoctorRoutes
