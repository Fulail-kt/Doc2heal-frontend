import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DoctorForm from '../../components/Doctor/DoctorForm';
import Header from '../../components/Header/Header';
import Spinner from '../../components/Spinner/Spinner';
import User from '../../@types';
import Api from '../../services/api';

const Application: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { isApproved } = useSelector((state:{useDetails: {isApproved: boolean;}}) => state.useDetails);
  const [user, setUser] = useState<User | undefined>();
  const [id, setId] = useState<string | undefined>();

  type Token = {
    id: string;
    role: string;
  };

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        return navigate('/login');
      }

      try {
        const decode: Token = jwtDecode<Token>(token);

        setId(decode.id);

        if (decode.role === 'doctor') {
          return navigate('/dashboard');
        }

        await fetchData();
      } catch (error) {
        console.error('Error decoding token:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [navigate, id,]);

  const fetchData = async () => {
    
    try {
      const response = await Api.get('/getuser', { params: { id } })
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

 
  if (loading) {
    return <Spinner />;
  }

  

  return (
    <div className='w-100'>
      {!isApproved ? (
        <>
          <Header />
          <div className='profile_bg  min-h-[600px] flex flex-1 justify-center items-center'>
            <DoctorForm fetchUser={fetchData} user={user} />
          </div>
        </>
      ) : (
        <Navigate to='/dashboard' />
      )}
    </div>
  );
};

export default Application;
