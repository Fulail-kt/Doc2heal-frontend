import {useNavigate } from 'react-router-dom';
import Loginpage from '../components/Login/Login'
import {jwtDecode} from 'jwt-decode'
import { useEffect } from 'react';
import Header from '../components/Header/Header';
 


const Login:React.FC=()=> {
  const token=localStorage.getItem('token')
  const navigate=useNavigate()
  useEffect(()=>{
    if(token){
      jwtDecode<{ _id: string; role: string }>(token);
      navigate('/')
    }

  },[token])

  
  return (
    <>
    <Header/>
    <Loginpage/>
    </>
  )
}

export default Login
