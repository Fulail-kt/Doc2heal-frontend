import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { login } from '../../redux/authSlice';
import Spinner from '../Spinner/Spinner';
import User from '../../@types';
import api from '../../services/api';

type FormData = {
  email: string;
  password: string;
};

type Token = {
  id: string;
  role: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchData = async (data: FormData) => {
    try {
      setLoading(true); 

      const res = await api.post('/login', data, { withCredentials: true });
      return res.data;
    } finally {
      setLoading(false); 
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (value) => {
    try {
      const data = await fetchData(value);

      if (data.isVerified === false && data.message) {
        navigate('/otp', {
          state: {
            otp: true,
            email: data.email,
            msg: data.message,
            username: data?.username,
          },
        });
        toast.error(data.message);
      } else if (data.success) {
        const { token, user, refresh } = data;
        const decode: Token | null = jwtDecode<Token>(token);

        dispatch(
          login({
            id: decode?.id,
            username: user.username,
            email: user.email,
            role: user.role,
            isApproved: user.isApproved,
          })
        );

        localStorage.setItem('token', token);
        // document.cookie = `refresh=${refresh}; max-age=${24 * 60 * 60}; path=/`;

        if (decode?.role === 'admin') {
          navigate('/admin');
        } else if (decode?.role === 'doctor') {
          navigate('/doctor', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } else if (data.message) {
        toast.error(data.message);
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data.message ||
        'An error occurred. Please try again after some time';
      toast.error(errorMessage);
    }
  };
 
  return (
    <>
       <Toaster />
       {loading?(<Spinner/>):(
    <div className="login_bg h-screen py-6 flex flex-col sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-14">
          <div className="max-w-md mx-auto">
            <div>
              <img src="" alt="sample logo" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      autoComplete="off"
                      id="email"
                      type="text"
                      className={`peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${
                        errors?.email ? 'border-red-500' : ''
                      }`}
                      placeholder="Email address"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                    {errors?.email && (
                      <span className="text-red-500 text-sm">{errors.email.message}</span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters',
                        },
                      })}
                      autoComplete="off"
                      id="password"
                      type="password"
                      className={`peer bg-transparent placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 ${
                        errors?.password ? 'border-red-500' : ''
                      }`}
                      placeholder="Password"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                    {errors?.password && (
                      <span className="text-red-500 text-sm">{errors.password.message}</span>
                    )}
                  </div>
                  <div className="relative">
                   

                    <button
                      type="submit"
                      className="bg-blue-500 text-white rounded-md px-2 py-1"
                    >
                      Submit
                    </button>
                   
                  </div>
                </div>
              </div>
              <div className='flex'>
                <p>Dont have Account?</p> <Link to='/signup'><span className='text-blue-500'>SignUp</span></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
     )}
    </>
  );
};

export default Login;


