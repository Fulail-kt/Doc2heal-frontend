// EmailVerification.tsx
import React, { useEffect, useState } from 'react';
// import { HiOutlineMail } from 'react-icons/hi';
import api from '../../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';

const Otp: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']); // State to store verification code


  const location = useLocation();
  const { otp ,email} = location.state || {};

  const navigate=useNavigate()



  const handleChange = (index: number, value: string) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const code = verificationCode.join('');
 
    try {
        console.log('Verification Code:',code);
       let response = await api.post('/verify-otp',{code,email})
         console.log(response?.data);

         if (response.data?.success) {
            // If success is true, navigate to the home
            console.log('Verification successful!');
     
            navigate('/login');
          } else {
            console.log('Verification failed!');
            // Handle verification failed
            console.log(response.data?.message);
            toast.error(response.data?.message)
            navigate('/otp')

          }
        
    } catch (error) {

        console.error('Error during verification:', error);
        
    }
    
    
  };

  useEffect(()=>{

    if(!otp){
        navigate("/")
    }

  },[])

  return (
    <>
    <Toaster/>
   
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {verificationCode.map((digit, index) => (
                    <div key={index} className="w-16 h-16 ">
                      
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        maxLength={1}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                      type="submit"
                    >
                      Verify Account
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p> <a className="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">
                      Resend
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Otp;
