
import { useEffect, useState } from "react";
import "./Conversation.css";
import Api from "../../services/api";
import User from "../../@types";

export default function Conversation({ conversation, currentUserId }: { conversation: any; currentUserId: string }) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const friendId = conversation.members.find((m: any) => m !== currentUserId);

    const getUser = async () => {
      try {
        const res = await Api.get("/getuser", { params: { id: friendId } });

        setUser(res.data.user);
      } catch (err:any) {
        console.error(err.message);
      }
    };
    getUser();
  }, [currentUserId, conversation]);

  return (
    <div className="cursor-pointer  m-5 flex flex-col sm:flex-row items-center hover:bg-gray-800 hover:text-white px-3 rounded-md sm:h-10">
      <img
        className="rounded-full w-16 sm:w-7 h-7 sm:mr-3 hidden sm:block"
        src={user?.image}
        alt=""
      />
      <span className="text-center text-[10px] sm:text-sm md:text-base sm:text-left mt-2 sm:mt-0">{user?.username}</span>
    </div>
  );
}
