import { FC, useEffect,useState } from 'react'
import Table from '../../components/Admin/Table'
import useApi from '../../hooks/useApi';
import Spinner from '../../components/Spinner/Spinner';
import Swal from 'sweetalert2'
import Adminheader from '../../components/Header/AdminHeader';
import User from '../../@types';
import Api from '../../services/api';
import { useNavigate } from 'react-router-dom';


const DoctorsList: FC = () => {

  const [refresh, setRefresh] = useState<boolean>(false);
  const navigate=useNavigate()

  const handleBlock = async (userId: string) => {
    try {
      Swal.fire({
        title: 'Confirmation?',
        width: '350px',
        text: 'Are you sure want!',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, block it!',
        customClass: {
          title: 'text-xl',
        },
      }).then(async (result) => {
        if (result.isConfirmed) {

            const res=await Api.put(`/admin/blockUser/${userId}`)
          setRefresh((prev) => !prev);

          if (res?.data?.notAdmin) {
            localStorage.removeItem('token')
            navigate('/')
          }
        }
      });

    } catch (error) {
      console.log((error as Error).message);
    }
  };

 
  const handleApprove = async (userId: string) => {
    try {
      Swal.fire({
        title: 'Confirmation?',
        width: '350px',
        text: 'Are you sure want to continue',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        customClass: {
          title: 'text-xl',
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await Api.put(`/admin/ApproveUser/${userId}`);

          if (response?.data?.notAdmin) {
            localStorage.removeItem('token')
            navigate('/')
          }
          setRefresh((prev) => !prev);
        }
      });
    } catch (error) {
      // Handle error
      console.error(error);
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

  const doctors=user.filter((user)=>{
    return user.role==="doctor"
  })


return (
    <>
     <div className='bg-gray-200 h-screen'>
      <Adminheader/>
        <div>
          <Table user={doctors} onApprove={handleApprove} onBlock={handleBlock} />
        </div>
    </div>
    </>
  )
}

export default DoctorsList


