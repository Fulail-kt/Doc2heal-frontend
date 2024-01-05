import { FC, useEffect, useState } from 'react';
import Adminheader from '../../components/Header/AdminHeader';
import Api from '../../services/api';
import Modal from '../../components/modal/modal';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Payments: FC = () => {
    const [paymentReq, setPaymentReq] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<any>({});
    const [status, setStatus] = useState("requested");
    const navigate=useNavigate()

    const closeModal = () => {
        setOpen(false);
        setSelected({})
    };

    const openModal = (payment: {}) => {
        closeModal();
        setSelected(payment)
        setOpen(true);
    };

    const fetchPayment = async () => {
        try {
            const payment = await Api.get('/admin/paymentRequests', { params: { status } });

            if (payment?.data?.notAdmin) {
                localStorage.removeItem('token')
                navigate('/')
              }
            setPaymentReq(payment.data.payment);
        } catch (error) {
            console.error('Error fetching payment requests:', error);
        }
    };

    const updateWithdraw = async (id: string, status: string) => {
        try {
            const response = await Api.patch('/admin/updatePayment', { id, status })

            if (response?.data?.notAdmin) {
                localStorage.removeItem('token')
                navigate('/')
              }
            if (response?.data?.success) {
                toast.success("Successfully Request Updated")
                closeModal()
                fetchPayment()
            }
        } catch (error:any) {
            const errorMessage = error.response.data.message
            toast.error(errorMessage)
        }
    }

    useEffect(() => {
        fetchPayment();
    }, [status]);

    return (
        <div className='w-full bg-gray-200 h-screen'>
            <Adminheader />
            <div className='w-full flex justify-center items-center'>
                <div className='w-[60%]'>
                    <h2 className='text-2xl font-bold text-center mb-4'>Payment Requests</h2>

                    <div className='w-full cursor-pointer flex text-w justify-around'><span onClick={() => setStatus('requested')} className={` ${status == "requested" ? "bg-blue-500 text-white px-5 py-1 shadow-lg shadow-gray-400 text-center rounded-full w-32" : "w-32 px-5 py-1 text-center"}`}>All</span><span onClick={() => setStatus('accepted')} className={`${status == "accepted" ? "bg-blue-500 text-white px-5 py-1 shadow-lg shadow-gray-400 text-center  rounded-full w-32" : "w-32 px-5 py-1 text-center"}`} >Approved</span><span onClick={() => setStatus('rejected')} className={` ${status == "rejected" ? "bg-blue-500 text-white px-5 py-1 shadow-lg shadow-gray-400 text-center rounded-full w-32" : "w-32 px-5 py-1 text-center"}`}>Rejected</span></div>
                    <ul className='w-full cursor-pointer flex justify-center m-4'>
                        {paymentReq.length === 0 ? (
                            <p className='text-center text-gray-500 mt-4'>No payment requests found.</p>
                        ) : (
                            <ul className='w-full cursor-pointer flex justify-center m-4'>
                                {paymentReq.map((payment:{_id:string,status:string,doctorId:{username:string}}) => (
                                    <li key={payment._id} className='mb-4' onClick={() => openModal(payment)}>
                                        <h3>
                                            {payment?.doctorId?.username} withdraw {payment?.status} click to{' '}
                                            <span className='text-blue-500'>view More</span>
                                        </h3>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </ul>
                    <Modal onClose={closeModal} isOpen={open}>
                        <ul>
                            <h1 className='text-center text-xl font-semibold'>Withdraw Request</h1>
                            {selected && (
                                <li key={selected?._id} className='mb-4'>
                                    <h3>Doctor: {selected.doctorId?.username} ({selected.doctorId?._id})</h3>
                                    <p>Wallet Amount: {selected?.walletAmount}</p>
                                    <p>Account Number: {selected.bankDetails?.AcNumber}</p>
                                    <p>Repeat Account: {selected.bankDetails?.Repeataccount}</p>
                                    <p>IFSC: {selected.bankDetails?.ifsce}</p>
                                    <p>Account Holder: {selected?.bankDetails?.accountHolder}</p>
                                    {selected?.status === "requested" ? ( <div className='w-full mt-2 flex justify-around'> <button onClick={() => { updateWithdraw(selected._id, "accepted") }} className='bg-green-500 px-4 rounded-full text-white'> Accept </button> <button onClick={() => { updateWithdraw(selected._id, "rejected") }} className='bg-red-500 px-4 rounded-full text-white'> Reject </button> </div> ) : ( <p className={`text-center ${selected?.status === "rejected" ? 'text-red-500' : selected?.status === "accepted" ? 'text-green-500' : ''}`}> {selected?.status === "rejected" ? "Rejected" : selected?.status === "accepted" ? "Accepted" : ""} </p> )}
                                </li>
                            )}
                        </ul>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Payments;
