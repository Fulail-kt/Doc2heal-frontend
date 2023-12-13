import { FC, useCallback, useEffect, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../services/socket';

const Lobby: FC = () => {
  const [roomId, setId] = useState('');
  const navigate = useNavigate();
  const email = 'abcd@gmail.com';

  const handleClick = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('room:join', { email, roomId });
    handleJoinRoom({ email, roomId });
  }, [email, roomId, socket]);

  const handleJoinRoom = useCallback((data: { email: string; roomId: string }) => {
    const { email, roomId } = data;
    console.log('helloooooooooooooo');
    console.log(email, roomId, "'''''''''''");
    navigate(`/room/${roomId}`);
  }, [navigate]);

  useEffect(() => {
    socket.on('room:join', handleJoinRoom);

    return () => {
      socket.off('room:join', handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className='flex justify-center h-96 items-center'>
      <div className=''>
        <div className='flex justify-center w-full'>
          <h1 className='font-semibold text-2xl overline'>APPOINTMENTS</h1>
        </div>
        <div>
          <form action="" onSubmit={handleClick}>
            <input
              type='text'
              name='roomId'
              className='border p-2 border-blue-600 mx-5'
              onChange={(e) => setId(e.target.value)}
            />
            <button type='submit' className='btn'>
              join
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
