import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../Pages/Admin/AdminDashboard';
import PatientsList from '../Pages/Admin/PatientsList';
import DoctorsList from '../Pages/Admin/DoctorsList';
import  ProtectedRoute  from './Protected';
import Applications from '../Pages/Admin/Applications';
import Payments from '../Pages/Admin/Payments';

const AdminRoutes: React.FC = () => {
  return (
    <>
      <Routes>
         <Route path='/' element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
         <Route path='/doctors' element={<ProtectedRoute allowedRole="admin"><DoctorsList /></ProtectedRoute>} />
         <Route path='/patients' element={<ProtectedRoute allowedRole="admin"><PatientsList /></ProtectedRoute>} />
         <Route path='/applications' element={<ProtectedRoute allowedRole="admin"><Applications /></ProtectedRoute>} />
         <Route path='/payments' element={<ProtectedRoute allowedRole="admin"><Payments /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default AdminRoutes;