import Routers from "../Routes/Routers";
// import Footer from "../components/Footer/Footer";
// import Header from "../components/Header/Header";
import AdminHeader from '../components/Header/AdminHeader'
// import AdminNavbar from '../components/Navbar/Navbar'
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
// import DoctorHeader from "../components/Header/DoctorHeader";

function Layout() {
  const [role, setRole] = useState<string | undefined>("");
  const token = localStorage.getItem("token");
  let decode: { _id: string; role: string } | undefined;

  useEffect(() => {
    if (token) {
      decode = jwtDecode<{ _id: string; role: string }>(token);
      setRole(decode?.role);
    }
  }, [token]); 

  return (
    <>
    
    
      {role === "doctor" ? (
        <main>
          
          <Routers />
     
        </main>
      ) : role === "admin" ? (
        <>
          {/* Admin Layout */}
          <main>
            <AdminHeader />
            <Routers />
          </main>
        </>
      ) : (
        <>
          {/* User Layout */}
          <main>

            <Routers />
          
          </main>
        </>
      )}
    </>
  );
}

export default Layout;
