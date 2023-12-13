// ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import {  useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | undefined>(undefined);

  const token = localStorage.getItem('token');

  useEffect(() => {
    try {
      if (token) {
        const decode = jwtDecode<{ _id: string; role: string }>(token);

        setRole(decode.role);

        if (decode.role !== allowedRole) {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      // Handle error if necessary
    } finally {
      setLoading(false);
    }
  }, [token, navigate, allowedRole]);



  return loading ? <Spinner/> : role === allowedRole ? <>{children}</> : null;
};

export default ProtectedRoute;
