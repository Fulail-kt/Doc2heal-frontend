import { FC, useCallback, useEffect, useState } from 'react'
import socket from '../../services/socket'
import ReactPlayer from 'react-player'
import peer from '../../services/peer'
import { faPhoneSlash, faVideo, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const VideoCall: FC = () => {

    const [remoteSocketId, setRemoteSocketId] = useState("")
    const [myStream, setMyStream] = useState<any>({})
    const [remoteStream, setRemoteStream] = useState<any>({})

    const handleUserJoined = useCallback(({ email, id }: { email: string, id: string }) => {
        console.log(email, "joined room");
        setRemoteSocketId(id)
    }, []);


    const constrains = {
        video: {
            width: { min: 640, ideal: 1920, max: 1920 },
            height: { min: 480, ideal: 1080, max: 1080 },
        },
        audio: true,
    };


    const handleLeaveCall = () => {
        // Your existing logic for leaving the call
        if (myStream && myStream instanceof MediaStream) {
            myStream.getTracks().forEach((track) => {
                track.stop();
            });
        }

        setMyStream(null);
        setRemoteStream(null);
        // Additional cleanup if needed
    };

    const handleToggleMicrophone = () => {
        
        const audioTrack = myStream.getAudioTracks()[0];
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled;
        }
        // Update the state if needed
    };

    const handleToggleVideo = () => {
        // Add logic to toggle video
        // For example, you can toggle the video track in the local strea

        const videoTrack = myStream.getVideoTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = !videoTrack.enabled;
        }
        // Update the state if needed
    };

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia(constrains)
        const offer = await peer.getOffer()
        socket.emit("user:call", { to: remoteSocketId, offer })
        setMyStream(stream)
    }, [remoteSocketId, socket])

    const handleIncommingCall = useCallback(async ({ from, offer }: {
        offer: RTCSessionDescriptionInit; from: string;
    }) => {
        setRemoteSocketId(from)
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        setMyStream(stream)
        const ans = await peer.getAnswer(offer);
        socket.emit('call:accepted', { to: from, ans })
    }, [socket])

    const sendStreams = useCallback(() => {

        if (typeof myStream === "string") {
            console.error('invalid mystream type')
            return;
        }
        for (const track of myStream.getTracks()) {
            peer.peer.addTrack(track, myStream)
        }
    }, [myStream])

    const handleCallAccepted = useCallback(({ from, ans }: { from: any; ans: any }) => {
        peer.setLocalsDescription(ans)
        console.log("call accepted");
        sendStreams()
    }, [sendStreams])


    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer()
        socket.emit('peer:nego:needed', { offer, to: remoteSocketId })
    }, [remoteSocketId, socket])



    useEffect(() => {
        peer.peer.addEventListener('negotiationneeded', handleNegoNeeded)
        return () => {
            peer.peer.removeEventListener('negotiationneeded', handleNegoNeeded)

        }
    }, [handleNegoNeeded])

    const handleNegoNeedIncomming = useCallback(async ({ from, offer }: { from: any; offer: any }) => {
        const ans = await peer.getAnswer(offer)
        socket.emit("peer:nego:done", { to: from, ans })
    }, [socket])

    const handleNegoNeedFinal = useCallback(async ({ ans }: { ans: any }) => {
        await peer.setLocalsDescription(ans)
    }, [])

    useEffect(() => {
        peer.peer.addEventListener('track', async (ev: { streams: any }) => {
            const remoteStream = ev.streams
            setRemoteStream(remoteStream[0])
        });
    }, [])

    useEffect(() => {
        socket.on('user:joined', handleUserJoined);
        socket.on('incomming:call', handleIncommingCall);
        socket.on('call:accepted', handleCallAccepted);
        socket.on('peer:nego:needed', handleNegoNeedIncomming);
        socket.on('peer:nego:final', handleNegoNeedFinal);
        return () => {
            socket.off('user:joined', handleUserJoined)
            socket.off('incomming:call', handleIncommingCall);
            socket.off('call:accepted', handleCallAccepted);
            socket.off('peer:nego:needed', handleNegoNeedIncomming);
            socket.off('peer:nego:final', handleNegoNeedFinal);


        }
    }, [socket, handleUserJoined, handleIncommingCall, handleCallAccepted, handleNegoNeedIncomming, handleNegoNeedFinal, myStream])
    return (


        <div className='w-full text-center flex justify-center items-center bg-black h-screen'>
            <div>
                <h4 className='text-white'>{remoteSocketId ? "connected" : 'no one in room'}</h4>
                {remoteSocketId && <button className='btn px-2 py-2' onClick={handleCallUser}>Call</button>}
                {remoteStream && <button className='btn p-1 py-2' onClick={sendStreams}>Send Stream</button>}
            </div>
            <div className='absolute border bottom-8 right-32'>
                {myStream &&
                    <>
                        <h1 className='text-white'>My Stream</h1>
                        <ReactPlayer playing muted height="200px" width="300px" url={myStream} />

                    </>}
            </div>

            <div className='w-full '>
                {remoteStream &&
                    <>

                        <h1>Remote stream</h1>
                        <ReactPlayer playing muted height="90%" width="90%" url={remoteStream} />

                    </>}
                <div className='absolute bottom-10 w-[80%] justify-center items-center flex '> 
                <div className='w-[25%] flex justify-around cursor-pointer items-center bg-white bg-opacity-20 shadow-md rounded-full h-16'>
                    <button onClick={handleLeaveCall} className='bg-red-500 rounded-full text-center h-10 w-10'>
                        <FontAwesomeIcon icon={faPhoneSlash} />
                    </button>
                    <button onClick={handleToggleVideo} className='bg-red-500 rounded-full h-10 w-10'>
                        <FontAwesomeIcon icon={faVideo} />
                    </button>
                    {/* <button onClick={handleToggleMicrophone} className='bg-red-500 rounded-full h-10 w-10'>
                        <FontAwesomeIcon icon={faMicrophoneSlash} />
                    </button> */}
                </div> </div>
            </div>
        </div>
    )
}

export default VideoCall