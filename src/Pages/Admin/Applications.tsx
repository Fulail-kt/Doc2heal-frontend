import { FC, useEffect, useState } from 'react'
import Adminheader from '../../components/Header/AdminHeader'
import Api from '../../services/api'
import User from '../../@types'
import toast, { Toaster } from 'react-hot-toast';
import Modal from '../../components/modal/modal';
import { useNavigate } from 'react-router-dom';

const Applications: FC = () => {

  const [appliedUsers, setAppliedUsers] = useState<User[]>()
  const [expandedUser, setExpandedUser] = useState<User[]|any>();
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate()
  const fetchUser = async () => {
    try {
      const res = await Api.get('/getAllusers');

      if (res?.data?.notAdmin) {
        localStorage.removeItem('token')
        navigate('/')
      }

      if (res.data.user.length > 0) {
        const users: User[] = res.data.user;
        const appliedUsers = users.filter((user) => {
          return user.formStatus;
        });
        setAppliedUsers(appliedUsers)
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };


  useEffect(() => {
    fetchUser();
  }, [])
  useEffect(() => {
    fetchUser();
  }, [refresh])

  const handleUserClick = (user: User) => {
    setExpandedUser(user);
    openModal();
  };


  const handleVerify = async (userId: string, status: string) => {
   
    try {

      const res = await Api.put('/admin/applicationStatus', { userId, status })
      if (res?.data?.notAdmin) {
        localStorage.removeItem('token')
        navigate('/')
      }
      if (res?.data) {
        toast.success(res?.data?.message)
        setRefresh((prev) => !prev)
        setOpen(false);
      }
    } catch (error:any) {
      const errorMessage = error.response.data.message
      toast.error(errorMessage)
    }
  }

  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };


  const openModal = () => {
    closeModal();
    setOpen(true);
  };

  const handleOpenInNewTab = (documentUrl:string) => {
    window.open(documentUrl, '_blank');
  };


  useEffect(() => {

  }, [refresh])

  return (
    <>
      <Toaster />
      <div className='bg-gray-200 flex-1 h-screen'>
        <Adminheader />
        <div className='container w-full flex flex-col items-center justify-center '>
          <div className='flex w-1/2 justify-around  p-2'>
            <h1>All</h1>
            <h1>Accepted</h1>
            <h1>Rejected</h1>
          </div>
          {appliedUsers?.map((apply) => (
            <div
              className='border items-center border-blue-500 mt-3 rounded-md flex w-1/2 justify-around p-2 cursor-pointer'
              key={apply._id}
              onClick={() => handleUserClick(apply)}>
              <p>{apply.username}</p>
              <p>{apply.email}</p>
              {/* <p className={`text-white ${apply.formStatus === "Accepted" ? "bg-green-500 text-white p-2 rounded-md" : apply.formStatus === "Rejected" ? "bg-red-500 p-2 rounded-md" : "bg-blue-700 p-2 rounded-md"}`}> {apply.formStatus === "submitted" ? "Pending" : apply.formStatus} </p> */}
            </div>
          ))}

          {open && (
            <Modal isOpen={true} onClose={closeModal}>
              <>
                <div className='mt-1 w-60 sm:w-80 md:w-[400px] cursor-default border bg-slate-200 rounded-md flex flex-col justify-center items-center p-4 '>
                  <div className='overflow-auto'>
                    <p className='text-center font-semibold text-xl'>User Details:</p>
                    <p>Name: {expandedUser?.username}</p>
                    <p>Email: {expandedUser?.email}</p>
                    Documents:
                    <div className='flex-col'>
                      {expandedUser?.documents?.map((item:any, index:number) => (
                        <div key={index} className='m-2'>
                          <button onClick={() => handleOpenInNewTab(item)} className='bg-slate-600 text-white p-1 rounded-md text-sm'>
                            View Document {index + 1}
                          </button>
                        </div>
                      ))}
                    </div>
                    {expandedUser.formStatus == "submited" ? (<>
                      <div className='flex justify-around w-full'><button className='bg-green-500 rounded-full px-2 text-white' onClick={() => handleVerify(expandedUser?._id, "Accepted")}>Accept</button><button onClick={() => handleVerify(expandedUser?._id, "Rejected")} className='bg-red-500 text-white rounded-full px-2'>Reject</button></div>
                    </>) : (<>
                      <div className='flex justify-center w-full bg-gray-400 text-white rounded-md'><h1>Request {expandedUser.formStatus}</h1></div>
                    </>)}
                  </div>
                </div>
              </>
            </Modal>
          )}

        </div>
      </div>
    </>
  );
};

export default Applications
