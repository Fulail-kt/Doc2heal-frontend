import { FC, useEffect, useState } from 'react';
import Table from '../../components/Admin/Table';
import useApi from '../../hooks/useApi';
import Spinner from '../../components/Spinner/Spinner';
import api from '../../services/api';
import Swal from 'sweetalert2';
import AdminHeader from '../../components/Header/AdminHeader';
import User from '../../@types';
import { useNavigate } from 'react-router-dom';



const PatientsList: FC = () => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const navigate=useNavigate()
  const handleBlock = async (userId: string) => {
    try {
      const result = await Swal.fire({
        title: 'Confirmation?',
        width: '350px',
        text: 'Are you sure you want to block it?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, block it!',
        customClass: {
          title: 'text-xl',
        },
      });

      if (result.isConfirmed) {
         const res=await api.put(`/admin/blockUser/${userId}`);

         if (res?.data?.notAdmin) {
          localStorage.removeItem('token')
          navigate('/')
        }
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const { fetchData, loading, data, error } = useApi<{ user: User[] }>('/getAllusers', 'get',);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  if (loading) {
    return <div className='bg-gray-200  h-screen'> <Spinner /></div>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const user: User[] = data.user || [];

  const patients=user.filter((user)=>{
   return user.role==="patient"
  })


  

  // const 

  return (
    <>
       <div className='bg-gray-200 h-screen'>
        <AdminHeader />
        <div>
          <Table onBlock={handleBlock} user={patients} />
        </div>
      </div>
    </>
  );
};

export default PatientsList;
