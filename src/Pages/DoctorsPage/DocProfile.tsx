import React, { useEffect, useState } from 'react'
import DocNavbar from '../../components/Navbar/DocNavbar'
import Api from '../../services/api'
import { jwtDecode } from 'jwt-decode'
import User from '../../@types'

const DocProfile:React.FC = () => {

    const [doctor,setDoctor]=useState<User>()

    const token=localStorage.getItem('token')
       const decode = jwtDecode<{ id: string; role: string }>(token);
       const id=decode.id

    const fetchUser=async ()=>{
        const res=await Api.get('/getUser',{params:{id:id}})
        console.log(res);
        setDoctor(res.data.user)


        
    }

    useEffect(()=>{

        fetchUser();
    },[])



  return (
    <>
        <div className='flex flex-col min-h-screen bg-gray-400'>
            <div className='bg-[#202231] w-full h-16'></div>
                <div className='flex flex-1 w-full '>
            <div className='bg-[#202231]'>
                <DocNavbar/>
            </div>
            <h2>Doc profile</h2>
            <div>
                <div  className='flex w-full justify-center h-56 items-center'>
                    {doctor &&(<>
                    <div>
                        <img src={doctor.image} width={150} height={50} alt="" />
                    </div>
                    <div>
            
                        <p>{doctor.username}</p>
                        <p>{doctor.email}</p>
                        <p>{doctor.phone}</p>
                        <p>{doctor.gender}</p>
                    </div>
            
                    </>)}
                </div>
                <div>
                    <p>Wallet : {doctor?.wallet?.balance}</p>
                </div>
            </div>
                  
                </div>
        </div>
    </>
  )
}

export default DocProfile
