import { FC } from 'react'
// import { useNavigate } from 'react-router-dom'
// import socket from '../../services/socket'

const Appointments: FC = () =>  {

  

    // const [id, Setid] = useState('')

    // const navigate = useNavigate()

    // const handleClick = () => {
      
        // navigate(`/room/${id}`)

        // try {

        //     if (id) {
        //         navigate(`/room/${id}`)
        //     }

        // } catch (error: any) {
        //     console.log(error.message);

        // }
    // }


    return (
        <div className='flex justify-center h-96 items-center'>
            <div className=''>
                <div className='flex justify-center w-full'>
                    <h1 className='font-semibold text-2xl overline'>APPOINTMENTS</h1>
                </div>
              
            </div>
        </div>

    )
}

export default Appointments
