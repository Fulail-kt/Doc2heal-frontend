
import {FC} from 'react'
import {jwtDecode} from 'jwt-decode'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Signupage from '../components/Signup/Signup'
import Header from '../components/Header/Header';
 

const Signup:FC = () => {


  const token=localStorage.getItem('token')
  const navigate=useNavigate()
  useEffect(()=>{
    if(token){
    jwtDecode<{ _id: string; role: string }>(token);
      navigate('/')
    }
  },[token])

  return (
    <div>
      <Header/>
      <Signupage/>
    </div>
  )
}

export default Signup
