import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../Pages/Admin/AdminDashboard';
import PatientsList from '../Pages/Admin/PatientsList';
import DoctorsList from '../Pages/Admin/DoctorsList';
import  ProtectedRoute  from './Protected';

const AdminRoutes: React.FC = () => {
  return (
    <>
      <Routes>
         <Route path='/' element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
         <Route path='/doctors' element={<ProtectedRoute allowedRole="admin"><DoctorsList /></ProtectedRoute>} />
         <Route path='/patients' element={<ProtectedRoute allowedRole="admin"><PatientsList /></ProtectedRoute>} />
      </Routes>
    </>
  );
};

export default AdminRoutes;