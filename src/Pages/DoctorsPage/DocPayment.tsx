import { useEffect, useState } from 'react';
import DocNavbar from '../../components/Navbar/DocNavbar';
import { jwtDecode } from 'jwt-decode';
import Api from '../../services/api';
import User from '../../@types';
import Modal from '../../components/modal/modal';
import moment from 'moment';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
// import toast from 'react-hot-toast';
const DocPayment = () => {
    const [doctor, setDoctor] = useState<User>();
    const [acNumber, setAcNumber] = useState<number>();
    const [repeatAcNumber, setRepeatAcNumber] = useState<number>();

    const [ifscCode, setIfscCode] = useState('');
    const [accountHolder, setAccountHolder] = useState('');
    const [acNumberError, setAcNumberError] = useState('');
    const [repeatAcNumberError, setRepeatAcNumberError] = useState('');
    const [ifscCodeError, setIfscCodeError] = useState('');
    const [accountHolderError, setAccountHolderError] = useState('');
    const [Id,setId]=useState("")

    const token = localStorage.getItem('token');
    let id=""

    useEffect(()=>{
        if (token) {
            const decode = jwtDecode<{ id: string; role: string }>(token);
             id = decode.id;
             setId(id)
             
          }

    },[token])

    const [open, setOpen] = useState(false);

    const closeModal = () => {
        setOpen(false);
    };

    const openModal = () => {
        closeModal();
        setOpen(true);
    };

    useEffect(() => {
        if (doctor && doctor.bankDetails) {
            setAcNumber(doctor.bankDetails.AcNumber || '');
            setRepeatAcNumber(doctor.bankDetails.Repeataccount || '');
            setIfscCode(doctor.bankDetails.ifsce || '');
            setAccountHolder(doctor.bankDetails.accountHolder || '');
        }
    }, [doctor]);

    const fetchUser = async () => {
        const res = await Api.get('/getUser', { params: { id: id } });
        setDoctor(res.data.user);
    };

    const validateForm = () => {
        let isValid = true;

        if (!acNumber) {
            setAcNumberError('Please enter Ac Number.');
            isValid = false;
        } else {
            setAcNumberError('');
            // Check if acNumber is not a number
            if (isNaN(acNumber)) {
                setAcNumberError('Ac Number must be a number.');
                isValid = false;
            }
        }

        if (repeatAcNumber) {
            setRepeatAcNumberError('');
            // Check if repeatAcNumber is not empty and not a number
            if (isNaN(repeatAcNumber)) {
                setRepeatAcNumberError('Repeat Ac Number must be a number.');
                isValid = false;
            } else if (acNumber !== repeatAcNumber) {
                setRepeatAcNumberError('Account Number is not matching.');
                isValid = false;
            }
        }

        if (!ifscCode) {
            setIfscCodeError('Please enter IFSC Code.');
            isValid = false;
        } else {
            const regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

            if (!regex.test(ifscCode)) {
                setIfscCodeError('Enter Valid IFSC Code');
                isValid = false;
            } else {
                setIfscCodeError('');
            }
        }

        if (!accountHolder) {
            setAccountHolderError('Please enter Account Holder.');
            isValid = false;
        } else {
            setAccountHolderError('');
        }

        return isValid;
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (validateForm()) {
            const res = await Api.post(`/doctor/bankDetailsUpdate/${id}`, { acNumber, repeatAcNumber, ifscCode, accountHolder })
            if (res.data.success) {
                // toast.success(res.data.message)
            }
        }
    };

    const handleWithdraw = async () => {
        const balance:number|undefined=doctor?.wallet?.balance
        if( balance){
            if(balance<500)
            return toast.error("wallet Amount must have 500")
        }
        Swal.fire({
            width: '320px',
            text: 'You won\'t be able to revert this!',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
        }).then(async(result) => {
            if (result.isConfirmed) {
                const response = await Api.post(`/doctor/requestPayment?id=${Id}`);
                if (!response.data.success){
                    toast.error(response?.data?.message)
                }
                toast.success(response?.data?.message)
            }
        });
    };

    useEffect(() => {
        fetchUser();
    }, []);

 


    return (
        <div className='flex flex-col min-h-screen bg-gray-400'>
        <Toaster/>
            <div className='bg-[#202231] w-full h-16'></div>
            <div className='flex flex-1 w-full '>
                <div className='bg-[#202231]'>
                    <DocNavbar />
                </div>
                <div className='w-full flex flex-col items-center'>
                    <div className='w-full flex justify-center mt-3'>
                        <div className='bg-gray-500 text-white h-36 w-2/3 rounded-md flex flex-col items-center justify-center'>
                            <h1 className='text-center font-semibold tracking-widest text-3xl'>My Wallet</h1>
                            <h1 className='text-center font-medium tracking-widest text-2xl'>₹{doctor?.wallet?.balance}</h1>
                        </div>
                    </div>

                    <div className='flex w-2/3 justify-center mt-3 gap-x-10 '>
                        <button className='bg-[#202231] rounded-2xl w-32 text-white font-light p-2' onClick={handleWithdraw} >Withdraw</button>
                        <button className='bg-[#202231] rounded-2xl w-32 text-white font-light p-2' onClick={openModal}>BankDetails</button>
                    </div>

                    <div className='flex justify-start w-[60%]'>
                        <h1 className='text-left mt-4 text-base font-medium tracking-wider'>Recent Transactions</h1>
                    </div>
                    <div className='h-96 overflow-scroll mt-1 rounded-md w-[60%]'>
                        {doctor && (doctor.wallet?.transactions as { paymentType: string; date: Date; _id: string,amount:number }[]).map((item) => (
                            <div className='flex text-gray-300 flex-col gap-x-10 justify-center mt-1 p-2 rounded-md px-4 bg-gray-500 bg-opacity-60' key={item?._id}>
                                <p className={`p-0 ${item?.paymentType === "credit" ? "text-green-400" : "text-red-400"} font-bold`}>Amount {item?.amount}</p>
                                <p>Date: {moment(item?.date).format('YYYY-MM-DD')}</p>
                                <p>Booking Id: {item?._id}</p>
                            </div>
                        ))}


                    </div>
                    {open && <Modal isOpen={true} onClose={closeModal}>
                        <h1 className='text-center font-semibold'>Bank Details</h1>
                        <form className='w-full p-3' onSubmit={handleSubmit}>
                            <div className='flex w-full justify-between py-2'>
                                <label htmlFor='acNumber' className='text-left'>
                                    Ac Number
                                </label>
                                <input
                                    defaultValue={doctor?.bankDetails?.AcNumber}
                                    type='number'
                                    id='acNumber'
                                    placeholder='Ex 104050002561'
                                    // value={acNumber}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAcNumber(Number(e.target.value))}
                                />
                            </div>
                            <div className='text-red-500 text-xs'>{acNumberError}</div>
                            <div className='flex w-full justify-between py-2'>
                                <label htmlFor="repeatAcNumber" className="text-left">Repeat Ac Number</label>
                                <input
                                    type="number"
                                    id="repeatAcNumber"
                                    placeholder="Ex 104050002561"
                                    defaultValue={doctor?.bankDetails?.Repeataccount}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepeatAcNumber(Number(e.target.value))}
                                    

                                />

                            </div>
                            <div className='text-red-500 text-xs'>{repeatAcNumberError}</div>
                            <div className='flex w-full justify-between py-2'>
                                <label htmlFor="ifscCode" className="text-left">IFSC Code</label>
                                <input
                                    type="text"
                                    id="ifscCode"
                                    placeholder='Ex SoIk7ft'
                                    defaultValue={doctor?.bankDetails?.ifsce}
                                    onChange={(e) => setIfscCode(e.target.value)}
                                />
                            </div>
                            <div className='text-red-500 text-xs'>{ifscCodeError}</div>
                            <div className='flex w-full justify-between py-2'>
                                <label htmlFor="accountHolder" className="text-left">Account Holder</label>
                                <input
                                    type="text"
                                    id="accountHolder"
                                    placeholder='Account Holder'
                                    defaultValue={doctor?.bankDetails?.accountHolder}
                                    onChange={(e) => setAccountHolder(e.target.value)}
                                />
                            </div>
                            <div className='text-red-500 text-xs'>{accountHolderError}</div>
                            <div className='pt-1 flex justify-center text-white'>
                                <button className='bg-gray-500 text-sm rounded-2xl py-1 px-2' type="submit">Submit</button>
                            </div>
                        </form>
                    </Modal>}
                </div>
            </div>
        </div>
    );
};

export default DocPayment;
