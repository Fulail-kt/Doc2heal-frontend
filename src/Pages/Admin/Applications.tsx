import { FC, useEffect, useState } from 'react'
import Adminheader from '../../components/Header/AdminHeader'
import Api from '../../services/api'
import User from '../../@types'

const Applications: FC = () => {

    const [appliedUsers, setAppliedUsers] = useState<User[]>()

    const fetchUser = async () => {
        try {
            const res = await Api.get('/getAllusers');

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



    const [expandedUser, setExpandedUser] = useState(null);

    const handleUserClick = (userId) => {
      setExpandedUser((prevUserId) => (prevUserId === userId ? null : userId));
    };
  
    return (
        <>
        <Adminheader/>
      <div className='container w-full flex flex-col items-center justify-center '>
        <div className='flex w-1/2 justify-around text-2xl p-2'>
          <h1>Name</h1>
          <h1>Email</h1>
        </div>
        <hr className='w-2/3 bg-gray-400 h-[1.5px]' />
  
        {appliedUsers?.map((apply) => (
          <div
            className='border border-blue-500 mt-3 rounded-md flex w-1/2 justify-around p-2 cursor-pointer'
            key={apply._id}
            onClick={() => handleUserClick(apply._id)}
          >
            <p>{apply.username}</p>
            <p>{apply.email}</p>
          </div>
        ))}
  
        {expandedUser && (
          <>
          <div className='mt-1 border w-1/2'>
            <div>
              <p>User Details:</p>
              <p>Name: {appliedUsers?.find((user) => user._id === expandedUser)?.username}</p>
              <p>Email: {appliedUsers?.find((user) => user._id === expandedUser)?.email}</p>
              Documents: {appliedUsers?.find((user) => user._id === expandedUser)?.documents?.map((doc)=>(
                  <div className='flex '><iframe  key={doc} src={doc }></iframe></div>
              ))}
            </div>
          <div className='w-full my-2 flex justify-center space-x-8'>
            <button className='btn m-0 px-4 py-1 bg-green-400 text-white'>Approve</button>
            <button className='btn m-0 px-4 py-1 bg-red-500 text-white'>Reject</button>
          </div>
          </div>
          </>
        )}
      </div>
     </>
    );
  };

export default Applications
