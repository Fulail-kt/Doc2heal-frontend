import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {User} from '../../@types';


interface TableProps {
    user: User[];
    onBlock: (userId: string) => void;
    onApprove?:(userId:string)=>void;
  }





const Table: React.FC<TableProps> = ({user,onBlock,onApprove}) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [path, setPath] = useState("");

  const [localUser, setLocalUser] = useState(user);

const location=useLocation()

useEffect(() => {
    setPath(location.pathname)
    
  setLocalUser(user);
}, [user,localUser]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = user.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(user.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4 ">
      <table className="min-w-full  text-center bg-gray-200 border border-gray-600 ">
        {/* Table Header */}
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-400">Name</th>
            <th className="py-2 px-4 border-b border-gray-400">Email</th>
            <th className="py-2 px-4 border-b border-gray-400">Role</th>
            {path=="/admin/doctors" && <th className="py-2 px-4 border-b border-gray-400">Approved Status</th>}
            <th className="py-2 px-4 border-b border-gray-400">Blocked Status</th>
            {/* <th className="py-2 px-4 border-b">Action</th> */}
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {currentItems.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b border-gray-400">{user.username}</td>
              <td className="py-2 px-4 border-b border-gray-400">{user.email}</td>
              <td className="py-2 px-4 border-b border-gray-400">{user.role}</td>

              {path === '/admin/doctors' && (<td className="py-2 px-4  border-b border-gray-400"><button className={`mt-0 p-2 btn ${user.isApproved ? 'bg-green-500' : 'bg-red-500'}`} onClick={() => onApprove && onApprove(user._id)}>
                {user.isApproved ? 'Approved' : 'Not Approved'}</button></td>)}
                

              {/* {path=='/admin/doctors?'&& <td className="py-2 px-4  border-b"><button className= {`mt-0 p-2 btn bg-${user.isApproved ? 'bg-red-500' : 'bg-green-500'}`} onClick={() => onApprove(user._id)}>{user.isApproved ? "Approved" : "UnApprove"}</button></td>} */}
              <td className="py-2 px-4  border-b border-gray-400"><button className= {`mt-0 p-2 btn ${user.isBlocked ? 'bg-red-500' : 'bg-green-500'}`} onClick={() => onBlock(user._id)}>{user.isBlocked ? "Blocked" : "Unblocked"}</button></td>
              
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <nav>
          <ul className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`cursor-pointer py-2 px-3 border ${
                  currentPage === index + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Table;
