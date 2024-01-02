

// ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
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
        const decode = jwtDecode<{ _id: string; role: string; isApproved: boolean }>(token);

        setRole(decode.role);

        if (decode.role !== allowedRole) {
          navigate('/');
        }

        if (decode.role === 'doctor' && allowedRole === 'doctor' && !decode.isApproved) {
          // If the doctor is not approved, navigate to the appropriate route
          navigate('/doctor/disapproved');
        }
      } else {
        // If there's no token, navigate to the login page
        navigate('/');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      // Handle error if necessary
    } finally {
      setLoading(false);
    }
  }, [token, navigate, allowedRole]);

  // Render the content based on conditions
  if (loading) {
    return <Spinner />;
  }

  if (role === allowedRole ) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute;
