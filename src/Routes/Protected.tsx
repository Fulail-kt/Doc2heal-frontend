import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Outlet, useNavigate } from 'react-router-dom';

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | undefined>(undefined);

  const token = localStorage.getItem('token');
  useEffect(() => {

    const fetchData = async () => {
      try {
        if (token) {
          const decode =jwtDecode<{ _id: string; role: string }>(token);
          setRole(decode.role);
          if (decode.role !== 'admin') {
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
    };

    fetchData();
  }, [token, navigate]);

  // Render the Outlet only if the conditions are met or show a loading indicator
  return loading ? <div>Loading...</div> : role === 'admin' ? <Outlet /> : null;
};
