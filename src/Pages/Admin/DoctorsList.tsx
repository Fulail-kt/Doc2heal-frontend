import { FC, useEffect,useState } from 'react'
import Table from '../../components/Admin/Table'
import useApi from '../../hooks/useApi';
import Spinner from '../../components/Spinner/Spinner';
import api from '../../services/api';
import Swal from 'sweetalert2'
import Adminheader from '../../components/Header/AdminHeader';
import User from '../../@types';


const DoctorsList: FC = () => {

 

  const [refresh, setRefresh] = useState<boolean>(false);

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

           await api.put(`/admin/blockUser/${userId}`)
          setRefresh((prev) => !prev);
          console.log(doctors, "---0-0-0-0-0-0-0-0-0");
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
          const response = await api.put(`/admin/ApproveUser/${userId}`);
          setRefresh((prev) => !prev);
          console.log(response.data);
        }
      });
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };


  // const { fetchData, loading, data, error } = useApi<Doctor[]>('/getAllDoctors', 'get');
  const { fetchData, loading, data, error } = useApi<{ user: User[] }>('/getAllusers', 'get',);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  if (loading) {
    return <Spinner />;
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
    <Adminheader/>
      <div>
        <Table user={doctors} onApprove={handleApprove} onBlock={handleBlock} />
      </div>
    </>
  )
}

export default DoctorsList


