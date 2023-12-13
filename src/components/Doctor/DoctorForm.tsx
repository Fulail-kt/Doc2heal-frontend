import { FC, useEffect, useState,  } from 'react';
import { useForm, SubmitHandler, } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import User from '../../@types';
import api from '../../services/api';
// import { useNavigate } from 'react-router-dom';/
// import Api from '../../services/api';
// import toast from 'react-hot-toast';

type FormValues = {
    phone: number;
    email: string;
    address: {

        name: string;
        house: string;
        post: string;
        pin: string;
        contact: string;
        state: string;
        District: string;

    };
    specialization: string;
    hospital: string;
    experience: string;
    fee: number;

};

interface DoctorFormProps {
    user?: User;
}

const DoctorForm: FC<DoctorFormProps> = ({ user }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();


    const[second,setSecond]=useState(false)
    


 


    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        data.address.name = data.address.name.trim();
        data.address.house = data.address.house.trim();
        data.address.contact = data.address.contact.trim();
        data.address.pin = data.address.pin.trim();
        data.address.state = data.address.state.trim();
        data.address.District = data.address.District.trim();
        data.specialization = data.specialization.trim();
        data.hospital = data.hospital.trim();
        data.experience = data.experience.trim();



           if (isNaN(data.fee)) {
                toast.error("Please enter a valid fee");
                return;
            }

        






        console.log(data);




        if (hasWhiteSpace(data.address.name) || hasWhiteSpace(data.address.contact) || hasWhiteSpace(data.address.pin) || hasWhiteSpace(data.address.state) || hasWhiteSpace(data.address.District) || hasWhiteSpace(data.specialization) || hasWhiteSpace(data.hospital)) {

            toast.error("please remove white space")


        } else {

            console.log(data,"dddddddddddddddddd");
            


            const response = await api.post(`/application`, data, {
            
            });

            console.log(response);



            if (response.data.success) {
                toast.success("successfully submitted")
                
                

                localStorage.setItem("second","true")
                setSecond(true)
            }




        }
    };


    // Custom function to check for white spaces
    const hasWhiteSpace = (value: string) => {
        return / \s/g.test(value);
    };



    useEffect(()=>{

        const second=localStorage.getItem("second")
        if(second){ 

            setSecond(true)
         }

      


    },[second])




    return (
        <>
            <Toaster />
            <div className="w-full justify-center flex mt-5 mb-5">
                {!second?(
                <div className="flex justify-center w-1/2 items-center p-4 border-4">
                    <form className='' onSubmit={handleSubmit(onSubmit)}>
                        <h1 className='w-100 flex justify-center text-2xl font-semibold'>Doctor Register</h1>
                        <div className="flex justify-between">
                            <div className="relative mt-4">
                                <input
                                    //  {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address', }, })}
                                    autoComplete="off" id="email" readOnly value={user?.email || ''} type="text" className={`peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${errors?.email ? 'border-red-500' : ''}`} placeholder="Email address" />
                                <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                    Email Address
                                </label>
                                {errors?.email && (<span className="text-red-500 text-sm">{errors.email.message}</span>)}
                            </div>

                            <div className="relative mt-4">
                                <input
                                    //  {...register('phone', { required: 'Phone is required' })}
                                    autoComplete="off" id="phone" readOnly value={user?.phone || ''} type="tel" className={`peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${errors?.phone ? 'border-red-500' : ''}`} placeholder="phone address" />
                                <label htmlFor="phone" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                    Phone
                                </label>
                                {errors?.phone && (<span className="text-red-500 text-sm">{errors.phone.message}</span>)}
                            </div>
                        </div>

                        <div className='mt-4 border-2 p-2 '>
                            <div className='w-100 flex justify-center'><label className='font-mono font-bold'>ADDRESS</label></div>
                            <div className="flex mt-2 justify-between">
                                <div className="relative">
                                    <input  {...register('address.name', { required: 'Name is required' })}
                                        autoComplete="off" id="name" type="text" className={`peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${errors?.address?.name?.message ? 'border-red-500' : ''}`} placeholder="Name" />
                                    <label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                        Name
                                    </label>
                                    {errors?.address?.name && (<span className="text-red-500 text-sm">{errors?.address?.name?.message}</span>)}
                                </div>
                                <div className="relative">
                                    <input  {...register('address.house', { required: 'house is required' })}
                                        autoComplete="off" id="house" type="text" className={`peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${errors?.address?.house?.message ? 'border-red-500' : ''}`} placeholder="Email address" />
                                    <label htmlFor="house" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                        House
                                    </label>
                                    {errors?.address?.house && (<span className="text-red-500 text-sm">{errors?.address?.house?.message}</span>)}
                                </div>
                            </div>
                            <div className="flex justify-between">

                                <div className="relative mt-4">
                                    <input  {...register('address.contact', { required: 'contact is required' })}
                                        autoComplete="off" id="contact" type="text" className={`peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${errors?.address?.contact?.message ? 'border-red-500' : ''}`} placeholder="Email address" />
                                    <label htmlFor="contact" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                        Contact
                                    </label>
                                    {errors?.address?.contact && (<span className="text-red-500 text-sm">{errors?.address?.contact?.message}</span>)}
                                </div>

                                <div className="relative mt-4">
                                    <input  {...register('address.pin', { required: 'pin is required' })}
                                        autoComplete="off" id="pin" type="text" className={`peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${errors?.address?.pin?.message ? 'border-red-500' : ''}`} placeholder="Email address" />
                                    <label htmlFor="pin" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                        Pin
                                    </label>
                                    {errors?.address?.pin && (<span className="text-red-500 text-sm">{errors?.address?.pin?.message}</span>)}
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="relative mt-4">
                                    <input  {...register('address.state', { required: 'state is required' })}
                                        autoComplete="off" id="state" type="text" className={`peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${errors?.address?.state?.message ? 'border-red-500' : ''}`} placeholder="Email address" />
                                    <label htmlFor="state" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                        State
                                    </label>
                                    {errors?.address?.state && (<span className="text-red-500 text-sm">{errors?.address?.state?.message}</span>)}
                                </div>
                                <div className="relative mt-4">
                                    <input  {...register('address.District', { required: 'District is required' })}
                                        autoComplete="off" id="District" type="text" className={`peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${errors?.address?.District?.message ? 'border-red-500' : ''}`} placeholder="Email address" />
                                    <label htmlFor="District" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                        District
                                    </label>
                                    {errors?.address?.District && (<span className="text-red-500 text-sm">{errors?.address?.District?.message}</span>)}
                                </div>
                            </div>
                        </div>
                        <div className="flex ">
                            <div className="relative mt-4">
                                <input  {...register('specialization', { required: 'Specialization is required' })}
                                    autoComplete="off" id="specialization" type="text" className={`peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${errors?.specialization?.message ? 'border-red-500' : ''}`} placeholder="Specialization" />
                                <label htmlFor="specialization" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                    Specialization
                                </label>
                                {errors?.specialization && (<span className="text-red-500 text-sm">{errors?.specialization?.message}</span>)}
                            </div>

                            <div className="relative mt-4">
                                <input  {...register('hospital', { required: 'hospital is required' })}
                                    autoComplete="off" id="hospital" type="text" className={`peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${errors?.hospital?.message ? 'border-red-500' : ''}`} placeholder="hospital" />
                                <label htmlFor="hospital" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                    hospital
                                </label>
                                {errors?.hospital && (<span className="text-red-500 text-sm">{errors?.hospital?.message}</span>)}
                            </div>
                        </div>
                        <div className="flex justify-between">


                            <div className="relative mt-4">
                                <select
                                    {...register('experience', {
                                        required: 'Experience is required',
                                    })}
                                    id="experience"
                                    className={`peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${errors?.experience?.message ? 'border-red-500' : ''
                                        }`}
                                >
                                    <option value="">Select Experience</option>
                                    <option value="0-1">0-1 years</option>
                                    <option value="2-5">2-5 years</option>
                                    <option value="5-10">5-10 years</option>
                                    <option value="10+">10+ years</option>
                                </select>
                                <label
                                    htmlFor="experience"
                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                >

                                </label>
                                {errors?.experience && (
                                    <span className="text-red-500 text-sm">{errors?.experience?.message}</span>
                                )}
                            </div>


                            <div className="relative mt-4">
                                <input
                                    {...register('fee', { required: 'fee is required' })}
                                    autoComplete="off"
                                    id="fee"
                                    type="text"
                                    className={`peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${errors?.fee?.message ? 'border-red-500' : ''}`}
                                    placeholder="Email address"
                                />
                                <label htmlFor="fee" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                                    Fee
                                </label>
                                {errors?.fee?.message && (<span className="text-red-500 text-sm">{errors.fee.message}</span>)}
                            </div>
                        </div>
                        <div className="flex">

                        </div>

                        <div className="flex justify-around">


                        </div>

                        <div className='mt-2 w-full flex justify-center'>
                            <button type="submit" className="bg-blue-500 text-white rounded-md px-2 py-1">
                                Submit
                            </button>
                        </div>

                    </form>
                </div>):(<>
                <form action="">
                    <div>
                        
                    </div>
                </form>
                </>)}
            </div>
        </>

    );
};

export default DoctorForm;


