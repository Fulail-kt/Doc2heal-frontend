
import React,{useState} from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler} from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
import Spinner from '../Spinner/Spinner';


type FormData = {
  username:String;
  email: string;
  phone: number;
  password: string;
  confirm: string;
};

const Signup: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<FormData>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  
  const navigate=useNavigate()

  const onSubmit: SubmitHandler<FormData> = async (data:FormData) => {
    setLoading(true)
    try {
      
      const { username, email, password, phone } = data;


     let response= await api.post(`/register`,{username,email,password,phone})

        console.log(response.data,"this is forntedn");
        // if(!response.data.isVerified){

        // }
        if(response.data?.success || !response.data.isVerified){
          navigate('/otp',{ state: { otp: true, email:response?.data?.email,id:response?.data?.id } })
        }else{
        console.log(response.data,"this is forntedn");
          toast.error(response.data.message)
        }

      

      
    } catch (error: any) {
      // Handle any other errors that might occur during the request
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };
  const onError: SubmitErrorHandler<FormData> = (errors) => {
    console.error(errors);
  };


  return (
    <>
  {loading? (
    <Spinner/>
  ) : (
    <div className="login_bg  overflow-y-auto  py-2 flex flex-col  sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-2 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10">
          <form action="" onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            <div className="max-w-md mx-auto">
              <div className="w-full flex justify-center">
               <h1>SIGNUP</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  {/* <div className="flex w-full justify-between"> */}
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="Username"
                        {...register('username', {
                          required: { value: true, message: 'Username is required' },
                          minLength: { value: 4, message: 'Username should have at least 2 characters' },
                          maxLength: { value: 30, message: 'Username should have at most 30 characters' },
                          validate: (value) => value.trim() === value || 'Insert valid data',
                        })}
                        type="text"
                        className="peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="Username"
                      />
                      <label
                        htmlFor="Username"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        First name
                      </label>
                      <div>
                        <p className="text-xs text-red-600">{errors.username?.message}</p>
                      </div>
                    </div>
                    {/* <div className="relative">
                      <input
                        autoComplete="off"
                        id="Lastname"
                        {...register('Lastname', {
                          required: { value: true, message: 'Last Name is required' },
                          minLength: { value: 2, message: 'Last Name should have at least 2 characters' },
                          maxLength: { value: 30, message: 'Last Name should have at most 30 characters' },
                          validate: (value) => value.trim() === value || 'Insert valid data',
                        })}
                        type="text"
                        className="peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="Lastname"
                      />
                      <label
                        htmlFor="Lastname"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Last name
                      </label>
                      <div>
                        <p className="text-xs text-red-600">{errors.Lastname?.message}</p>
                      </div>
                    </div> */}
                  {/* </div> */}

                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      {...register('email', {
                        required: { value: true, message: 'Email is required' },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: 'Invalid email address',
                        },
                        maxLength: { value: 100, message: 'Email should have at most 100 characters' },
                        validate: {
                          unsupported: (value) => {
                            return !value.toLowerCase().endsWith('gmail.com') ? 'Unsupported mail. Use gmail' : true;
                          },
                          whiteSpace: (value) => value.trim() === value || 'Remove white space',
                        },
                      })}
                      type="text"
                      className="peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                    <div>
                      <p className="text-xs text-red-600">{errors.email?.message}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="phone"
                      {...register('phone', {
                        required: { value: true, message: 'Phone is required' },
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Invalid phone number',
                        },
                      })}
                      type="tel"
                      className="peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                      placeholder="Phone"
                    />
                    <label
                      htmlFor="phone"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Phone
                    </label>
                    <div>
                      <p className="text-xs text-red-600">{errors.phone?.message}</p>
                    </div>
                  </div>

                  <div className="w-full flex justify-between">
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="password"
                        {...register('password', {
                          required: { value: true, message: 'Password is required' },
                          minLength: { value: 6, message: 'Password should have at least 8 characters' },
                          validate: (value) => value.trim() === value || 'Insert valid data',
                        })}
                        type="password"
                        className="peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="Password"
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Password
                      </label>
                      <div>
                        <p className="text-xs text-red-600">{errors.password?.message}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <div>
                        <input
                          autoComplete="off"
                          id="confirm"
                          {...register('confirm', {
                            required: { value: true, message: 'Confirm password is required' },
                            validate: (value) => value === form.getValues('password') || 'Passwords do not match',
                          })}
                          type="password"
                          className="peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                          placeholder="confirm"
                        />
                        <label
                          htmlFor="confirm"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Confirm Password
                        </label>
                      </div>
                      <div>
                        <p className="text-xs text-red-600">{errors.confirm?.message}</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <button className="bg-blue-500 text-white rounded-md px-2 py-1" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex'>
                <p>Already have Account?</p> <Link to='/login'><span className='text-blue-500'>LogIn</span></Link>
              </div>
          </form>
          <DevTool control={control} />
        </div>
      </div>
    </div>
      )}
    </>
  );
};

export default Signup;
