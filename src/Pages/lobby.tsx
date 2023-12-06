import {FC, useCallback, useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import socket from '../services/socket';
import peer from '../services/peer';

const Lobby:FC = () => {

    // let {id}=useParams();
    // console.log(id,"ddddddddddd");

    const [roomId,setId]=useState('')
    const navigate=useNavigate()


    const email="abcd@gmail.com"

    const handleClick = useCallback((e: any) => {
        e.preventDefault();
        socket.emit('room:join', { email, roomId })
        handleJoinRoom({ email, roomId });
    }, [email, roomId, socket]);
    
    const handleJoinRoom = useCallback((data: any) => {
        const { email, roomId } = data;
        console.log("helloooooooooooooo");
        console.log(email, roomId, "'''''''''''");
        navigate(`/room/${roomId}`);
    }, [navigate]);
    
    useEffect(() => {
        socket.on('room:join', handleJoinRoom);
    
        return () => {
            socket.off("room:join", handleJoinRoom);
        }
    }, [socket, handleJoinRoom]);
    


  return ( 

    <div className='flex justify-center h-96 items-center'>
            <div className=''>
                <div className='flex justify-center w-full'>
                    <h1 className='font-semibold text-2xl overline'>APPOINTMENTS</h1>
                </div>
                <div>
                    <form action="" onSubmit={handleClick}>
                        <input type="text" name='roomId' className='border p-2 border-blue-600 mx-5' onChange={(e) => setId(e.target.value)} />
                        <button className='btn' >join</button>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default Lobby
