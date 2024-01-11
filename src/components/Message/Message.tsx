import  { useState, useEffect } from 'react';
import './Message.css';
import moment from 'moment';

export default function Message({ message, own }:{message:any;own:any}) {
  const [displayTime, setDisplayTime] = useState('Just now');

  useEffect(() => {
    const secondsAgo = moment().diff(moment(message.createdAt), 'seconds');

    if (secondsAgo <= 5) {
      // If less than or equal to 5 seconds, show "Just now"
      const timer = setTimeout(() => {
        setDisplayTime(moment(message.createdAt).format('h:mm A'));
      }, (5 - secondsAgo) * 1000);

      return () => clearTimeout(timer);
    } else {
      // If more than 5 seconds, show the actual timestamp immediately
      setDisplayTime(moment(message.createdAt).format('h:mm A'));
    }
  }, [message.createdAt]);

  return (
    <div className={own ? 'message own' : 'message'}>
      <div className="messageTop">
        <div className='messageText'>
          <p className="">{message.message}</p> 
          <div className='w-full  text-end'><span className=' text-[10px]'>{displayTime}</span></div>
        </div>
      </div>
    </div>
  );
}
