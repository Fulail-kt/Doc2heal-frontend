import axios from "axios";
import { useEffect, useState } from "react";
import "./Conversation.css";
import Api from "../../services/api";

export default function Conversation({ conversation, currentUserId }) {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUserId);

    const getUser = async () => {
      try {
        const res = await Api.get("/getuser",{params:{id:friendId}});

        console.log(res);
        
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUserId, conversation]);

  return (
    <div className="conversation ">
      {/* <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
      /> */}
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}