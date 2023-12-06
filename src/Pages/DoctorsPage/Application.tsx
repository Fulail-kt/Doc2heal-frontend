import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DoctorForm from '../../components/Doctor/DoctorForm';
// import Spinner from '../../components/Spinner/Spinner';
// import DoctorNavbar from '../../components/Header/DoctorHeader';
import Header from '../../components/Header/Header';
import Spinner from '../../components/Spinner/Spinner';

const Application: React.FC = () => {
  const [loading,setLoading]=useState(true)
  const {  isApproved } = useSelector((state: any) => state.useDetails);
  

  type Token = {
    _id: string;
    role: string;
  };


  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    const checkAuthentication = async () => {
      if (!token) {
        return navigate('/login');
      } else {
        try {
          const decode: Token | null = jwtDecode<Token>(token);
  
          if (decode.role === 'doctor') {
            return navigate('/dashboard');
          }else{

            navigate('/application');
          }
          setLoading(false);
          
          
        } catch (error) {
          console.error('Error decoding token:', error);
          navigate('/login');
        }
      }
    };
  
   
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  
    checkAuthentication();
  }, []);

  if(loading){
    return(<Spinner/>)
  }
 

  return (
    <div className=''>
      {!isApproved ? (
        <div className='w-100'>
        <Header/>
        <DoctorForm />
        </div>
      ) : (
        <div>
          <Navigate to='/dashboard'/>
        </div>
      )}
    </div>
  );
};

export default Application;
