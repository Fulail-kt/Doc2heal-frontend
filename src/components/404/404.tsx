import { FC } from 'react';
import notFound from '../../assets/images/404construct.gif';
import Header from '../Header/Header';
import { Link, useLocation } from 'react-router-dom';

const NotFound: FC = () => {

  const location=useLocation()
  return (
    <div className='w-full profile_bg h-screen flex flex-col  items-center '>
 {!location.pathname.startsWith("/doctor") ? <Header />:(<div className=' h-20 flex justify-center items-center'> <Link to="/doctor" ><span className='bg-blue-500 px-4 py-1 rounded-2xl shadow-lg text-white'>Back Home</span></Link> </div>)}
      <div className='w-full justify-center flex bg-black'>
        <div className='w-full flex justify-center overflow-y-hidden' style={{ position: 'absolute', mixBlendMode: 'multiply' }}>
          <img className='bg-cover' src={notFound} alt="" />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
