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

type Token = {
  id: string;
  role: string;
};

const Profile: FC = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [imgloading, setimgLoading] = useState(false);
  const token = localStorage.getItem('token');
  let id:string;

  if (token) {
    const decode: Token | null = jwtDecode<Token>(token);
    id = decode.id;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const user = await Api.get(`/getuser`, { params: { id } });
      setUser(user.data.user);
    } catch (error) {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const profileUpload = async (e:any) => {
    try {
      const file = e.target.files[0];

      console.log(file,"888888888888888888");
      
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
    } catch (error) {
      setLoading(false);
      console.error('Error uploading profile:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);


  return (
    <div>
       {
                loading?(<Spinner/>):( <>
      <Toaster/>
      <Header />
      <section className='bg-[#fff9ea] pt-2 pb-2'>
        <div className='w-full flex items-center'>
          <div className='sm:w-100 lg:w-1/6'>
            <Navbar handleLogout={handleLogout} />
          </div>
          <div className='w-3/4 flex justify-center'>

            <div className='px-3 gap-x-3  rounded-xl w-[56%] flex items-center justify-center h-52 '>
              <div className='w-2/6 bg-gray-600 rounded-xl flex justify-center items-center shadow-xl h-[90%]'>
                
              {
                imgloading?(<Spinner/>):(<img src={user?.image?user?.image:userImg} className='rounded-xl bg-contain w-full h-full'   onClick={() => imgRef.current?.click()} alt="" />)
                }     
                            
                <input type="file" ref={imgRef} className='hidden'  accept="image/*" onChange={profileUpload} />
              </div>

              <div className='w-4/6 rounded-xl h-[90%] flex items-center  shadow-xl bg-[#ffffffd0]'>


                <div className='w-1/3 ml-5 text-lg font-semibold tracking-wider'>
                  <p>Name</p>
                  <p>Email</p>
                  <p>Phone</p>
                  <p>Gender</p>
                  {user?.specialization && <p>Specialization</p>}
                  {user?.experience && <p>Experience</p>}
                </div>
                <div className='text-lg tracking-wider'>
                  <p>: {user?.username}</p>
                  <p>: {user?.email}</p>
                  <p>: {user?.phone}</p>
                  <p>: {user?.gender}</p>
                  {user?.specialization && <p>: {user?.specialization}</p>}
                  {user?.experience && <p>: {user?.experience}</p>}
                </div>
              </div>

            </div>
            <div>
            </div>
          </div>
        </div>
      </section>

      <div className='w-full flex items-center justify-center gap-x-14 h-44 bg-green-200'>

        <div className='w-1/6  rounded-xl shadow-xl  h-40'>

        </div>

        <div className='w-1/6 bg-white rounded-xl shadow-xl  h-40'>

        </div>
      </div>
     </>
      )}    
    </div>
    
  );
}

export default Profile;
