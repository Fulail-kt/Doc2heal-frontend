import {FC,useEffect,useState} from 'react'
import Table from '../../components/Admin/Table'
import useApi from '../../hooks/useApi';
import Spinner from '../../components/Spinner/Spinner';
import api from '../../services/api';
import Swal from 'sweetalert2';
const PatientsList:FC = () => {

    interface Patient {
        _id: string;
        username: string;
        specialization: string;
        image: string;
        hospital: string;
        patients: number;
      }

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

              const response = await api.put(`/admin/blockUser/${userId}`)
              const patients: Patient[] = response.data || [];
              setRefresh((prev) => !prev);
              console.log(patients,"---0-0-0-0-0-0-0-0-0");

            }})
           
        } catch (error:any) {
    
            console.log(error.message);   
        }
          };
    
    
      // const { fetchData, loading, data, error } = useApi<Doctor[]>('/getAllDoctors', 'get');
      const { fetchData, loading, data, error } = useApi<{ user: Patient[] }>('/getAllusers', 'get','patient');
    
      useEffect(() => {
        fetchData();
      }, [refresh]); 
    
      if (loading) {
        return <Spinner/>;
      }
    
      if (error) {
        return <p>Error: {error.message}</p>;
      }


    
      const patients: Patient[] = data.user || [];
    
      console.log(data.user,"from admin")
    
  return (
    <div>
     <h1>usersList</h1> 
     <Table onBlock={handleBlock} user={patients}/>
    </div>
  )
}

export default PatientsList
