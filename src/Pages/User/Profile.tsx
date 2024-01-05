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
      if (error?.response?.data.isBlocked) {
        localStorage.removeItem('token');
        navigate('/', { replace: true });
      }
      console.error('Error fetching data:', error);
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
  }, [])

  return (
    <div className='profile_bg h-screen'>
      {
        loading ? (<Spinner />) : (<>
          <Toaster />
          <Header />
          <section className='m-0 p-0'>
            <div className='w-full flex items-center '>
              <div className='sm:w-100 lg:w-1/6'>
                <Navbar handleLogout={handleLogout} />
              </div>
              <div className='w-3/4 flex justify-center'>
                <div className='px-3 gap-x-3  rounded-xl w-[56%] flex items-center justify-center h-52 '>
                  <div className='w-2/6 bg-gray-600 rounded-xl flex justify-center items-center shadow-xl h-[90%]'>
                    {
                      imgloading ? (<Spinner />) : (<img src={user?.image ? user?.image : userImg} className='rounded-xl bg-contain w-full h-full' onClick={() => imgRef.current?.click()} alt="" />)
                    }
                    <input type="file" ref={imgRef} className='hidden' accept="image/*" onChange={profileUpload} />
                  </div>
                  <div className='w-4/6 rounded-xl  h-[90%] flex  items-center  shadow-xl bg-[#ffffffd0]'>
                    <div className='w-1/3 ml-5 text-lg font-semibold tracking-wider'>
                      <p>Name</p>
                      <p>Email</p>
                      <p>Phone</p>
                      <p>Gender</p>
                    </div>
                    {isEdit ? (<div className='text-lg tracking-wider'>
                      <form onSubmit={(e) => handleSubmit(e)} className='mt-7'>
                        <p>: <input type="text" className='tracking-wider' defaultValue={user?.username} onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })} /></p>
                        <p>: <input type="text" className='tracking-wider' readOnly defaultValue={user?.email} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} /></p>
                        <p>: <input type="number" className='tracking-wider' defaultValue={user?.phone} onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })} /></p>
                        <p>:
                          <select className='tracking-wider' value={editedUser?.gender} onChange={(e) => setEditedUser({ ...editedUser, gender: e.target.value })}>
                            <option defaultValue={user?.gender}>{user?.gender}</option>
                            <option value="male">male</option>
                            <option value="female">Female</option>
                          </select>
                        </p>
                        <div className='w-full flex justify-end'><button type='submit' className='bg-green-500 rounded-full text-white px-3 py-0'>Submit</button></div>
                      </form>
                    </div>) :
                      (<div className='text-lg tracking-wider'>

                        <p>: {user?.username}</p>
                        <p>: {user?.email}</p>
                        <p>: {user?.phone}</p>
                        <p>: {user?.gender}</p>

                      </div>)}
                    <div className='absolute cursor-pointer bg-red-400 text-white px-2 rounded-xl select-none right-72'><span onClick={() => setIsEdit(!isEdit)} className=''>Edit</span></div>
                  </div>
                </div>
                <div>
                </div>
              </div>
            </div>
          </section>
          <div className='w-full cursor-default flex items-center justify-center gap-x-14 h-44 '>
            <div className='w-2/6 border rounded-xl shadow-md  h-40'>
              <p className='text-center font-semibold text-lg shadow-md py-3'>Wallet Amount: ₹ {user?.wallet?.balance}</p>
              {/* <p className='text-center text-blue-400'>history</p> */}
              <div className='flex w-full justify-center flex-col items-center h-1/2'>
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
                <div className='w-100'>
                  {user?.wallet?.transactions.slice().reverse().map((history: { _id: string; paymentType: string; amount: number, date: string }) => (
                    <p key={history?._id} className={`text-center font-mono ${history?.paymentType === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                      {history?.amount} {history?.paymentType == "credit" ? "credited to" : "debited from"} your wallet at {moment(history.date).format('DD/MM/YYYY')}
                    </p>
                  ))}
                </div>
              </Modal>
            </div>
            <div className='w-2/6 bg-white border rounded-xl shadow-md  h-40'>
              <p className='text-center font-semibold text-lg shadow-md py-3'>Total Payment: ₹ {total}</p>
              {/* <p className='text-center text-blue-400'>history</p> */}
              <div className='flex w-full justify-center flex-col items-center h-1/2'>
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
                  <div className=''>
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
