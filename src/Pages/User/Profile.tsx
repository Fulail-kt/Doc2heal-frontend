import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import userImg from '../../assets/images/greenavatar.png';
import Navbar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import Spinner from '../../components/Spinner/Spinner';
import Api from '../../services/api';
import User from '../../@types';
import { logout } from '../../redux/authSlice';
import { jwtDecode } from 'jwt-decode';
import Modal from '../../components/modal/modal';
import moment from 'moment';

type Token = {
  id: string;
  role: string;
};

const Profile: FC = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [imgloading, setimgLoading] = useState(false);
  const [payment, setPayment] = useState([]);
  const [total, setTotal] = useState<number | undefined>();
  const token = localStorage.getItem('token');
  let id: string;
  if (token) {
    const decode: Token | null = jwtDecode<Token>(token);
    id = decode.id;
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgRef = useRef<HTMLInputElement | null>(null);
  const submitRef = useRef<HTMLInputElement | any>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState<User>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);


  const handleViewMore = () => {
    setIsModalOpen(true);
  };

  const handleView = () => {
    setIsModalOpen2(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalOpen2(false)
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const user = await Api.get(`/getuser`, { params: { id } });
      setUser(user.data.user);
    } catch (error: any) {
      
      if (error?.response?.data.accessToken) {
        localStorage.setItem('token',error?.response?.data.accessToken);
        navigate('/', { replace: true });
      }
      if (error?.response?.data.isBlocked) {
        localStorage.removeItem('token');
        navigate('/', { replace: true });
      }
      // console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate('/', { replace: true });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (editedUser.phone && editedUser.phone?.length != 10) {
      toast.error('Phone number must be 10 characters long');
      return;
    }
    try {
      const response = await Api.put(`/updateUser/${user?._id}`, {
        phone: editedUser.phone,
        username: editedUser.username,
        gender: editedUser.gender,
      });
      if (response.data.success) {
        toast.success(response.data.message)
        setIsEdit(false)
        fetchData()
      } else {
        toast.error(response.data.message)
      }
    } catch (error: any) {
      if (error?.response?.data.isBlocked) {
        localStorage.removeItem('token');
        navigate('/', { replace: true });
      }
    }
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

      setUser(response.data.user);
      setRefresh((prev) => !prev);
      toast.success(response.data.message);
      setTimeout(() => {
        setimgLoading(false);
      }, 100);
    } catch (error: any) {

      if (error?.response?.data.isBlocked) {
        localStorage.removeItem('token');
        navigate('/', { replace: true });
      }
      setLoading(false);
      console.error('Error uploading profile:', error);
    }
  };

  const fetchPayment = async () => {
    try {
      const response = await Api.get(`/paymenthistory?id=${id}`)
      if (response.data.success) {
        setPayment(response.data.payment)
        setTotal(response.data.total)
      }

    } catch (error) {

    }
  }

  useEffect(() => {
    fetchData();

  }, [refresh]);

  useEffect(() => {
    fetchPayment()
    fetchData();
  }, [token])

  return (
    <div className='profile_bg min-h-screen'>
      {
        loading ? (<Spinner />) : (<>
          <Toaster />
          <Header />
          <section className='m-0 p-0'>
            <div className='w-full flex items-center'>
              <div className='sm:w-1/6 lg:w-1/6'>
                <Navbar handleLogout={handleLogout} />
              </div>
              <div className='w-[50%] mr-2 ml-2 sm:mx-0 sm:w-full flex flex-col items-center justify-center'>
                <div className='w-32 sm:w-40 md:w-44 bg-gray-600 rounded-xl flex justify-center items-center shadow-xl h-auto mb-3 sm:mb-0'>
                  <div className='w-full'>
                    {imgloading ? (
                      <Spinner />
                    ) : (
                      <img src={user?.image ? user?.image : userImg} className='rounded-xl bg-contain w-full h-full cursor-pointer' onClick={() => imgRef.current?.click()} alt="" />
                    )}
                    <input type="file" ref={imgRef} className='hidden' accept="image/*" onChange={profileUpload} />
                  </div>
                </div>
                <div className='w-[100%] flex flex-col'>
                  <div className='flex justify-center items-center w-full  '>
                    <div className=' bg-[#ffffffd0] flex justify-center w-72  rounded-md  shadow-xl'>
                      <div className='text-xs sm:text-sm md:text-lg font-semibold h-full tracking-wider'>
                        <p>Name</p>
                        <p>Email</p>
                        <p>Phone</p>
                        <p>Gender</p>
                      </div>
                      {isEdit ? (
                        <div className='w-2/3 text-xs sm:text-sm md:text-lg'>
                          <form onSubmit={(e) => handleSubmit(e)} className='w-full'>
                            <p className='flex'>: <input type="text" className='tracking-wider w-[90%]' defaultValue={user?.username} onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })} /></p>
                            <p className='flex'>: <input type="text" className='tracking-wider w-[90%]' readOnly defaultValue={user?.email} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} /></p>
                            <p className='flex'>: <input type="number" className='tracking-wider w-[90%]' defaultValue={user?.phone} onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })} /></p>
                            <p className='flex'>:
                              <select className='tracking-wider w-[90%]' value={editedUser?.gender} onChange={(e) => setEditedUser({ ...editedUser, gender: e.target.value })}>
                                <option defaultValue={user?.gender}>{user?.gender}</option>
                                <option value="male">male</option>
                                <option value="female">Female</option>
                              </select>
                            </p>
                            <button type='submit' className='bg-green-500 hidden rounded-full text-white px-3 py-0' ref={submitRef}></button>
                          </form>
                        </div>
                      ) : (
                        <div className='w-2/3 text-xs sm:text-sm md:text-lg'>
                          <p className='flex'>: {user?.username}</p>
                          <p className='flex'>: {user?.email}</p>
                          <p className='flex'>: {user?.phone}</p>
                          <p className='flex'>: {user?.gender}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className=' flex justify-center  p-2'>
                    <div className='flex  gap-x-6'>
                      <div className='cursor-pointer bg-red-400 text-white px-2  rounded-xl '>
                        <span onClick={() => setIsEdit(!isEdit)} className=''>{isEdit ? "Cancel" : "Edit"}</span>
                      </div>
                      {isEdit && (
                        <button type='button' className='cursor-pointer bg-green-400 text-white px-2 rounded-xl select-none ' onClick={() => submitRef.current.click()}>
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className=' grid w-full place-items-center md:grid-cols-2'>
            <div className='w-[80%] md:w-4/6 border rounded-xl shadow-md  h-40'>
              <p className='text-center font-semibold sm:text-base md:text-lg shadow-md py-3'>Wallet Amount: ₹ {user?.wallet?.balance}</p>
              {/* <p className='text-center text-blue-400'>history</p> */}
              <div className='flex w-full justify-center flex-col text-xs sm:text-sm md:text-base items-center h-1/2'>
                <div>
                  {user?.wallet?.transactions.slice(-2).map((history: { _id: string; paymentType: string; amount: number; date: string }) => (
                    <p key={history?._id} className={`text-center font-mono ${history?.paymentType === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                      {history?.amount} {history?.paymentType == "credit" ? "credited to" : "debited from"} your wallet at {moment(history.date).format('DD/MM/YYYY')}
                    </p>
                  ))}
                </div>
              </div>
              <h3 className='cursor-pointer text-center text-blue-500' onClick={handleViewMore}>view more</h3>
              <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <div className='w-100 text-xs sm:text-sm md:text-base'>
                  {user?.wallet?.transactions.slice().reverse().map((history: { _id: string; paymentType: string; amount: number, date: string }) => (
                    <p key={history?._id} className={`text-center font-mono ${history?.paymentType === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                      {history?.amount} {history?.paymentType == "credit" ? "credited to" : "debited from"} your wallet at {moment(history.date).format('DD/MM/YYYY')}
                    </p>
                  ))}
                </div>
              </Modal>
            </div>
            <div className='w-[80%] mt-2 md:mt-0 md:w-4/6 bg-white border rounded-xl shadow-md  h-40'>
              <p className='text-center font-semibold sm:text-base md:text-lg shadow-md py-3'>Total Payment: ₹ {total}</p>
              {/* <p className='text-center text-blue-400'>history</p> */}
              <div className='flex w-full justify-center text-xs sm:text-sm md:text-base flex-col items-center h-1/2'>
                <div>
                  {payment.slice(-2).map((history: { _id: string; date: Date; fee: number; doctorId: { username: string } }) => (
                    <p className='text-center font-mono' key={history?._id}>
                      {history?.fee} debited for booking with {history?.doctorId?.username} at {moment(history.date).format('DD/MM/YYYY')}
                    </p>
                  ))}
                </div>
              </div>
              <h3 className='cursor-pointer text-center text-blue-500' onClick={handleView}>view more</h3>
              <div>
                <Modal isOpen={isModalOpen2} onClose={handleCloseModal}>
                  <div className='text-xs'>
                    {payment.slice().reverse().map((history: { _id: string; fee: number; doctorId: { username: string } }) => (
                      <p key={history?._id} className={`text-center font-mono`}>
                        {history?.fee} debited for booking with {history?.doctorId?.username}
                      </p>
                    ))}
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </>
        )}
    </div>
  );
}

export default Profile;
