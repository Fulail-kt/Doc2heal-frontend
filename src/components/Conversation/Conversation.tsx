import { useEffect, useState } from "react";
import "./Conversation.css";
import Api from "../../services/api";
import User from "../../@types";

export default function Conversation({ conversation, currentUserId }:{conversation:any;currentUserId:string}) {
  const [user, setUser] = useState<User>();


  useEffect(() => {
    const friendId = conversation.members.find((m:any) => m !== currentUserId);

    const getUser = async () => {
      try {
        const res = await Api.get("/getuser",{params:{id:friendId}});
        
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUserId, conversation]);

  return (
    <div className=" cursor-pointer m-5 flex space-x-3 items-center hover:bg-gray-800 hover:text-white px-3 rounded-md h-10">
      <img
        className="rounded-full w-7 h-7 -x-4"
        src={user?.image} 
        alt=""
      />
      <span className="w-full ">{user?.username}</span>
    </div>
  );
}