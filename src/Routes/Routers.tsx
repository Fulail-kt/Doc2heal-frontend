// import { FC, useState, useEffect } from 'react';
// import { Routes, Route} from 'react-router-dom';
// import { ProtectedRoute } from './Protected';
// import Home from '../Pages/User/Home';
// import Signup from '../Pages/Signup';
// import Login from '../Pages/Login';
// import Profile from '../Pages/User/Profile';
// import DoctorsDetails from '../Pages/User/DoctorsDetails';
// import Doctors from '../Pages/User/Doctors';
// import Otp from '../Pages/User/otp';
// import AdminDashboard from '../Pages/Admin/AdminDashboard';
// import { jwtDecode } from 'jwt-decode';
// import NotFound from '../components/404/404';
// import DoctorsList from '../Pages/Admin/DoctorsList';
// import PatientsList from '../Pages/Admin/PatientsList';
// import DocDashboard from '../Pages/DoctorsPage/DocDashboard';
// import Application from '../Pages/DoctorsPage/Application';
// import Spinner from '../components/Spinner/Spinner';

// import Appointments from '../Pages/User/Appointments';
// import Lobby from '../components/lobby';
// import Room from '../Pages/Room';
// import TimeSlots from '../Pages/DoctorsPage/TimeSlots';


// const Routers: FC = () => {
//   const [role, setRole] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem('token');
  

//   useEffect(() => {
//     const fetchRole = async () => {
//       if (token) {
//         try {
//           const decode = await jwtDecode<{ _id: string; role: string }>(token);
//           setRole(decode.role);
//         } catch (error) {
//           setRole(null);
//         }
//       } else {
//         setRole(null);
//       }

//       setLoading(false); 
//     };

//     fetchRole();
//   }, [token]);

  
//   if (loading) {
//     return <Spinner/>;
//   }

//   const rolenew=localStorage.getItem("role")

//   console.log(rolenew,"eeeeeee");
  


//   return (
//     <Routes>
//       {role === 'admin' ? (
//         <>
//           <Route path="/admin" element={<ProtectedRoute />}>
//             <Route path="/admin" element={<AdminDashboard />} />
//           </Route>
//           {/* <Route path="/admin/doctorsList" element={<ProtectedRoute />}> */}
          
//             <Route path="admin/doctors" element={<DoctorsList/>} />
//             <Route path="admin/patients" element={<PatientsList/>} />
//           {/* </Route> */}
//         </>
//       ) : role === 'doctor' ? (
//         <>
//           <Route path="/dashboard" element={<DocDashboard />} />
//           <Route path="/bookings" element={< TimeSlots/>} />
//           <Route path="/room/:id" element={<Room/>} />

//         </>
//       ) : (
//         <>

//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/otp" element={<Otp />} />

//           <Route path="/" element={<Home />} />
//           <Route path="/doctors" element={<Doctors />} />
//           <Route path="/doctor/:id" element={<DoctorsDetails />} />


//           <Route path="/profile" element={<Profile />} />
//           <Route path="/application" element={<Application />} />
//           <Route path="/appointments" element={<Appointments/>} />

//           <Route path="/room/:id" element={<Room/>} />
//           <Route path="/lobby" element={<Lobby/>} />
//           <Route path="/success" element={<h1>this is scucesss</h1>} />
          


//         </>
//       )}

     
//       <Route path="/*" element={<NotFound />} />
//     </Routes>
//   );
// };

// export default Routers;
