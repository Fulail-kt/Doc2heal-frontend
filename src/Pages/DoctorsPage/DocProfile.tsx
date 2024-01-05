import React, { useEffect, useRef, useState } from 'react'
import DocNavbar from '../../components/Navbar/DocNavbar'
import Api from '../../services/api'
import { jwtDecode } from 'jwt-decode'
import User from '../../@types'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner/Spinner'

const DocProfile: React.FC = () => {

    const [doctor, setDoctor] = useState<User|any>()
    const [imgLoading, setimgLoading] = useState<boolean>()
    const navigate=useNavigate()
    const token:any = localStorage.getItem('token')
    const decode = jwtDecode<{ id: string; role: string }>(token);
    const id = decode.id
    const imgRef = useRef<HTMLInputElement | null>(null);
  
    const fetchUser = async () => {
        const res = await Api.get('/getUser', { params: { id: id } })
        setDoctor(res.data.user)
    }

    const profileUpload = async (e: any) => {
        try {
            const file = e.target.files[0];
            if (!file) return;

            setimgLoading(true);
            const formData = new FormData();
            formData.append('file', file);

            const response = await Api.patch('/editProfile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            // setDoctor(response.data.user);
            fetchUser()
            // setRefresh((prev) => !prev);
            toast.success(response.data.message);

            setTimeout(() => {
                setimgLoading(false);
            }, 100);
        } catch (error: any) {

            if (error?.response?.data.isBlocked) {
                localStorage.removeItem('token');
                navigate('/', { replace: true });
            }
            // setLoading(false);
            console.error('Error uploading profile:', error);
        }
    };
    useEffect(() => {
        fetchUser();
    }, [])



    return (
        <>
        <Toaster/>
            <div className='flex flex-col min-h-screen bg-gray-400'>
                <div className='bg-[#202231] w-full h-16'></div>
                <div className='flex flex-1 w-full '>
                    <div className='bg-[#202231]'>
                        <DocNavbar />
                    </div>
                    <div className='w-full flex-col flex justify-center items-center '>
                        <div className='flex flex-col justify-center mt-3 items-center w-full'>
                            {doctor && (<>
                                {/* <div className='flex  justify-center'>

                                    <img src={doctor.image} className='shadow-2xl rounded-lg' width={150} height={80} alt="" />
                                </div> */}

                                <div className='flex  justify-center'>

                                    {
                                        imgLoading ? (<div className='w-40 h-40'>
                                            <Spinner />
                                        </div>) : (<img src={doctor?.image && doctor?.image } className='shadow-2xl rounded-lg' width={150} height={80} alt={doctor?.username}  onClick={() => imgRef.current?.click()} />)
                                    }

                                    <input type="file" ref={imgRef} className='hidden' accept="image/*" onChange={profileUpload} />
                                </div>

                                <div className='text-center flex w-[80%] mt-3 mb-2  justify-center'>

                                    <div className="w-[70%] rounded-md">
                                        <dl>
                                            <div className="bg-gray-300 bg-opacity-30 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-900 text-left">
                                                    Full name
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-950  sm:mt-0 sm:col-span-2 ">
                                                    {doctor?.username}
                                                </dd>
                                            </div>
                                            <div className="bg-slate-300 bg-opacity-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-900 text-left">
                                                    Specialization
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-950  sm:mt-0 sm:col-span-2">
                                                    {doctor?.specialization}
                                                </dd>
                                            </div>
                                            <div className="bg-gray-300 bg-opacity-30 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-900 text-left">
                                                    Email address
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-950  sm:mt-0 sm:col-span-2">
                                                    {doctor?.email}
                                                </dd>
                                            </div>
                                            <div className="bg-slate-300 bg-opacity-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-900 text-left">
                                                    Experience
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-950  sm:mt-0 sm:col-span-2">
                                                    {doctor?.experience} Years
                                                </dd>
                                            </div>
                                            <div className="bg-gray-300 bg-opacity-30 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-900 text-left">
                                                    Appoinment Fee
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-950  sm:mt-0 sm:col-span-2">
                                                    {doctor?.fee}
                                                </dd>
                                            </div>
                                            <div className="bg-slate-300 bg-opacity-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-900 text-left">
                                                    Hospital
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-950  sm:mt-0 sm:col-span-2">
                                                    {doctor?.hospital}
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>

                                </div>

                            </>)}
                        </div>
                        <div className='w-full flex justify-around '>
                            <div className='bg-gray-300 bg-opacity-50 w-1/3 m-1 h-56 rounded-lg'>
                                <h1 className='text-center m-1'>ADDRESS</h1>
                                <div className=' flex m-3 rounded-md bg-slate-300 bg-opacity-40'>
                                    <div className='flex flex-col w-full justify-center '>
                                        <div className="  bg-opacity-50 px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-900 text-left">
                                                Name                                        </dt>
                                            <dd className="mt-1 text-sm text-gray-950  sm:mt-0 sm:col-span-2">
                                                {doctor?.address[0]?.name}
                                            </dd>
                                        </div>
                                        <div className="  bg-opacity-50 px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-900 text-left">
                                                House
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-950  sm:mt-0 sm:col-span-2">
                                                {doctor?.address[0]?.house}
                                            </dd>
                                        </div>
                                        <div className="  bg-opacity-50 px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-900 text-left">
                                                Contact
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-950  sm:mt-0 sm:col-span-2">
                                                {doctor?.address[0]?.contact}
                                            </dd>
                                        </div>
                                        <div className="  bg-opacity-50 px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-900 text-left">
                                                Pin
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-950  sm:mt-0 sm:col-span-2">
                                                {doctor?.address[0]?.pin}
                                            </dd>
                                        </div>
                                        <div className="  bg-opacity-50 px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-900 text-left">
                                                District
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-950  sm:mt-0 sm:col-span-2">
                                                {doctor?.address[0]?.District}
                                            </dd>
                                        </div>
                                        <div className="  bg-opacity-50 px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-900 text-left">
                                                State
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-950  sm:mt-0 sm:col-span-2">
                                                {doctor?.address[0]?.state}
                                            </dd>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DocProfile
