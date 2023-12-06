import {FC, useCallback, useEffect,useState} from 'react'
import socket from '../services/socket'
import ReactPlayer from 'react-player'
import peer from '../services/peer'



const Room:FC = () => {

    const [remoteSocketId,setRemoteSocketId]=useState("")
    const [myStream,setMyStream]=useState({})
    const [remoteStream,setRemoteStream]=useState({})

    const handleUserJoined = useCallback(({ email, id }: { email: string, id: string }) => {
        console.log(email, "joined room");
        setRemoteSocketId(id)
    }, []);
    
    const handleCallUser= useCallback(async()=>{
        const stream= await navigator.mediaDevices.getUserMedia({audio:true,video:true})
        const offer=await peer.getOffer()
        socket.emit("user:call",{to:remoteSocketId,offer})
        setMyStream(stream)
    },[remoteSocketId,socket])

    const handleIncommingCall=useCallback(async({from,offer}:{from:string;offer:any})=>{
        setRemoteSocketId(from)
        const stream= await navigator.mediaDevices.getUserMedia({audio:true,video:true})
        setMyStream(stream)
        console.log(from,offer);
        const ans=await peer.getAnswer(offer);
        socket.emit('call:accepted',{to:from,ans})
    },[socket])

    const sendStreams=useCallback(()=>{
        for(const track of myStream.getTracks()){
            peer.peer.addTrack(track,myStream)
        }
    },[myStream])

    const handleCallAccepted=useCallback(({from,ans}:{from:any;ans:any})=>{
        peer.setLocalsDescription(ans)
        console.log("call accepted");
        sendStreams()
    },[sendStreams])


    const handleNegoNeeded = useCallback(async()=>{
        const offer=await peer.getOffer()
        socket.emit('peer:nego:needed',{offer,to:remoteSocketId})
    },[remoteSocketId,socket])

    

    useEffect(()=>{
        peer.peer.addEventListener('negotiationneeded',handleNegoNeeded)
        return()=>{
        peer.peer.removeEventListener('negotiationneeded',handleNegoNeeded)
            
        }
    },[handleNegoNeeded])

    const handleNegoNeedIncomming=useCallback(async({from,offer}:{from:any;offer:any})=>{
        const ans= await peer.getAnswer(offer)
        socket.emit("peer:nego:done",{to:from,ans})
    },[])

    const handleNegoNeedFinal=useCallback(async({ans})=>{
        await peer.setLocalsDescription(ans)
    },[])

    useEffect(()=>{
        peer.peer.addEventListener('track',async ev=>{
            const remoteStream=ev.streams
            setRemoteStream(remoteStream[0])
        });
    })

    useEffect(()=>{
        socket.on('user:joined',handleUserJoined);
        socket.on('incomming:call',handleIncommingCall);
        socket.on('call:accepted',handleCallAccepted);
        socket.on('peer:nego:needed',handleNegoNeedIncomming);
        socket.on('peer:nego:final',handleNegoNeedFinal);
        return()=>{
            socket.off('user:joined',handleUserJoined)
        socket.off('incomming:call',handleIncommingCall);
        socket.off('call:accepted',handleCallAccepted);
        socket.off('peer:nego:needed',handleNegoNeedIncomming);
        socket.off('peer:nego:final',handleNegoNeedFinal);


        }
    },[socket,handleUserJoined,handleIncommingCall,handleCallAccepted,handleNegoNeedIncomming,handleNegoNeedFinal])
  return (
    

      <div className='w-full text-center'>
        <h1>ROOOOM</h1>
        <h4>{remoteSocketId? "connected":'no one in room'}</h4>
        {remoteSocketId && <button className='btn' onClick={handleCallUser}>Call</button>}
        {myStream &&
            <>
            <h1>My Stream</h1>
         <ReactPlayer playing muted height="200px" width="300px" url={myStream} />
        
        </>}

        {remoteStream &&
            <>
        {remoteStream && <button className='btn' onClick={sendStreams}>Send Stream</button>}

            <h1>Remote stream</h1>
         <ReactPlayer playing muted height="200px" width="300px" url={remoteStream} />
        
        </>}
        
      </div>
  )
}

export default Room
