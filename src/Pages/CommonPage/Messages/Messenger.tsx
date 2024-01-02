import './Messenger.css';
import Conversation from '../../../components/Conversation/Conversation';
import Message from '../../../components/Message/Message';
import { useEffect, useRef, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Api from '../../../services/api';
import DocNavbar from '../../../components/Navbar/DocNavbar';
import { useLocation } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import Header from '../../../components/Header/Header';
import socket from '../../../services/socket';

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState('');


  const scrollRef = useRef();
  const location = useLocation()

  const token = localStorage.getItem('token');
  const decode = jwtDecode<{ id: string; role: string }>(token);
  const id = decode.id;

// add user
  useEffect(() => {
    socket.emit('addUser', id);
    socket.on("getUsers", (users) => {
      console.log(users,"user");
    });
  }, []);

  //get messages
  useEffect(() => {
    const getMessages = async () => {
      try {
          const res = await Api.get('/messages/' + currentChat?._id);
          console.log('Messages response:', res.data);
            setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getMessages();
  }, [currentChat]);

  // get converstaion
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await Api.get('/conversations/' + id);
        setConversations(res.data.conversations);
      } catch (err) {
        console.error(err);
      }
    };
    getConversations();
  }, [id]);

  // Post messages
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      return;
    }
    const message = {
      senderId: id,
      message: newMessage,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat?.members?.find(member => member !== id)

    try {
      const res = await Api.post('/messages', message);
      console.log('Post message response:', res.data);

      socket.emit("sendMessage", {
        senderId: id,
        receiverId,
        message: newMessage
      })
    
      setMessages([...messages,message]);
      setNewMessage('');
    } catch (err) {
      console.error(err);
    }

  };

  useEffect(() => {

    socket.on('getMessages', (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        message: data.message,
        createdAt: Date.now()
      })
    })
  }, []);


  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.senderId) && setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className={`flex flex-col min-h-screen ${location.pathname === "/doctor/messages" ? 'bg-gray-400' : 'profile_bg '}`}>
        {location.pathname === "/doctor/messages" ? (<div className='bg-[#202231] h-16'></div>) : (<Header />)}
        <div className='flex flex-1'>
          {location.pathname == "/doctor/messages" ? (<div className='bg-[#202231]'>
            <DocNavbar />
          </div>) : (<div className=''>
            <Navbar handleLogout={false} />
          </div>)}
          <div className='w-full flex justify-center mt-4 '>
            <div className={`messenger w-[90%] rounded-lg shadow-2xl shadow-slate-800 ${location.pathname == "/doctor/messages" ? '  ' : 'bg-[#71a1ee]'} `}>
              <div className="chatMenu border-r-2">
                <div className="chatMenuWrapper ">
                  <div className='w-full flex flex-col items-center '><input placeholder="Search for friends" className="chatMenuInput outline-none rounded-full h-10 px-3" /></div>
                  {conversations.map((c) => (
                    <div key={c._id} onClick={() => setCurrentChat(c)}>
                      <Conversation conversation={c} currentUserId={id} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="chatBox">
                <div className="chatBoxWrapper">
                  {currentChat ? (
                    <>
                      <div className='bg-[#202231] text-center h-12 rounded-full '>
                        <p>{ }</p>
                      </div>
                      <div className="chatBoxTop">
                        {messages.map((m, index) => (
                          <div key={index}>
                            <Message message={m} own={m.senderId === id} />
                          </div>
                        ))}
                        <div ref={scrollRef}></div>
                      </div>
                      <div className=" flex items-center justify-between mt-2">
                        <input
                          className="w-full m-3  h-8 rounded-full px-4"
                          placeholder="Write something..."
                          onChange={(e) => setNewMessage(e.target.value)}
                          value={newMessage}
                        />
                        <button className="border-none bg-blue-600 text-white px-2 rounded-full py-1" onClick={handleSubmit}>
                          Send
                        </button>
                      </div>
                    </>
                  ) : (
                    <span className="text-center text-white text-lg font-medium flex items-center justify-center sm:text-xs  md:text-sm min-h-full">
                      Open a conversation to start a chat.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
