import React, { useEffect, useState } from 'react';
import Api from '../../services/api';
import {User} from '../../@types';


interface Conversation {
    _id: string;
    message: string;
    converstationId: string; // Update the property name here
    members: string[];
  }
  
  interface UserlistProps {
    conversation: Conversation;
    currentUserId: string;
  }

const Userlist: React.FC<UserlistProps> = ({ conversation, currentUserId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUserId);

    const getUser = async () => {
      try {
        const res = await Api.get('/getuser', { params: { id: friendId } });
        setUser(res.data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [currentUserId, conversation]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className='flex justify-center text-white font-light text-xl '>
      <div className='text-center mt-5 w-[95%] '>
        {user ? (
          <div className='bg-gray-700 flex p-2  rounded-lg justify-center items-center gap-x-3'>
            <span className=''>
              <img src={user.image} className='w-8 rounded-full' alt='' />
            </span>
            <p>{user.username}</p>
          </div>
        ) : (
          <div>User not found</div> 
        )}
      </div>
    </div>
  );
};

export default Userlist;
