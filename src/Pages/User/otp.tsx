// // EmailVerification.tsx
// import React, { useEffect, useState } from 'react';
// // import { HiOutlineMail } from 'react-icons/hi';
// import api from '../../services/api';
// import { useLocation, useNavigate } from 'react-router-dom';
// import toast, { Toaster } from 'react-hot-toast';
// import Api from '../../services/api';

// const Otp: React.FC = () => {
//   const [verificationCode, setVerificationCode] = useState(['', '', '', '']);


//   const location = useLocation();
//   const { otp, email,username } = location.state || {};
//   const navigate = useNavigate()

//   const handleChange = (index: number, value: string) => {
//     const newCode = [...verificationCode];
//     newCode[index] = value;
//     // Move focus to the previous input field if the current value is empty and Backspace is pressed
//     if (!value && index > 0) {
//       document.getElementById(`otp-input-${index - 1}`)?.focus();
//     }
//     // Move focus to the next input field if the current value is not empty
//     if (value && index < verificationCode.length - 1) {
//       document.getElementById(`otp-input-${index + 1}`)?.focus();
//     }
//     setVerificationCode(newCode);
//   };


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const code = parseInt(verificationCode.join(''))

//     try {
//       let response = await api.post('/verify-otp', { code, email })

//       if (response.data?.success) {
//         navigate('/login');
//       } else {
//         toast.error(response.data?.message)
//       }

//     } catch (error: any) {
//       toast.error(error.message)
//       console.error('Error during verification:', error);
//     }
//   };

//   const ResendOtp = async () => {
//     try {
//       console.log("resent");

//       const response = await Api.post('/resendOtp', { email,username })
//     } catch (error) {

//     }
//   }

//   useEffect(() => {

//     if (!otp) {
//       navigate("/")
//     }

//   }, [])

//   return (
//     <>
//       <Toaster />

//       <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
//         <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
//           <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
//             <div className="flex flex-col items-center justify-center text-center space-y-2">
//               <div className="font-semibold text-3xl">
//                 <p>Email Verification</p>
//               </div>
//               <div className="flex flex-row text-sm font-medium text-gray-400">
//                 <p>We have sent a code to your email {email}</p>
//               </div>
//             </div>

//             <div>
//               <form onSubmit={handleSubmit}>
//                 <div className="flex flex-col space-y-16">
//                   <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
//                     {verificationCode.map((digit, index) => (
//                       <div key={index} className="w-16 h-16">
//                         <input
//                           id={`otp-input-${index}`}
//                           className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
//                           type="text"
//                           value={digit}
//                           onChange={(e) => handleChange(index, e.target.value)}
//                           maxLength={1}
//                         />
//                       </div>
//                     ))}

//                   </div>

//                   <div className="flex flex-col space-y-5">
//                     <div>
//                       <button
//                         className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-500 border-none text-white text-sm shadow-sm"
//                         type="submit"
//                       >
//                         Verify Account
//                       </button>
//                     </div>

//                     <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
//                       <p>Didn't receive code?</p> <span onClick={ResendOtp} className="flex flex-row items-center text-blue-600" rel="noopener noreferrer">
//                         Resend
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Otp;


import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Api from '../../services/api';
import Header from '../../components/Header/Header';

const Otp: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(false);

  const location = useLocation();
  const { otp, email, username } = location.state || {};
  const navigate = useNavigate();

  const startTimer = () => {
    setResendDisabled(true);
    setTimer(60);

    const intervalId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));

      if (timer === 0) {
        setResendDisabled(false);
        clearInterval(intervalId);
      }
    }, 1000);
  };


  const handleChange = (index: number, value: string) => {
    const newCode = [...verificationCode];
    newCode[index] = value;

    if (!value && index > 0) {
      document.getElementById(`otp-input-${index - 1}`)?.focus();
    }

    if (value && index < verificationCode.length - 1) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }

    setVerificationCode(newCode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = parseInt(verificationCode.join(''));

    try {
      let response = await api.post('/verify-otp', { code, email });

      if (response.data?.success) {
        navigate('/login');
      } else {
        toast.error(response.data?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error('Error during verification:', error);
    }
  };

  const ResendOtp = async () => {
    try {
      const response = await Api.post('/resendOtp', { email, username });
      startTimer();
      toast.success(response.data.message)
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    if (!otp) {
      navigate('/');
    }
  }, []);

  return (
    <>
      <Toaster />
      <div className='w-full profile_bg min-h-screen'>
        <Header/>
        <div className="relative  flex flex-col justify-center overflow-hidden py-12">
          <div className="relative  px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
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
                        <div key={index} className="w-16 h-16">
                          <input
                            id={`otp-input-${index}`}
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
                          className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-500 border-none text-white text-sm shadow-sm"
                          type="submit"
                        >
                          Verify Account
                        </button>
                      </div>

                      <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                        <p>Didn't receive code?</p>{' '}
                        <span
                          onClick={ResendOtp}
                          className={`flex flex-row items-center text-blue-600 ${resendDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                          rel="noopener noreferrer"
                        >
                          Resend {resendDisabled && `(${timer}s)`}
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;
