
import './App.css'
import { Route, Routes } from "react-router-dom"
import UserRoutes from "./Routes/UserRoutes"
import AdminRoutes from "./Routes/AdminRoutes"
import DoctorRoutes from "./Routes/DoctorRoutes"


function App() {
  return (
    <Routes>
       <Route path="/*" element={<UserRoutes />} />
        <Route path='/admin/*' element={< AdminRoutes/>} />
        <Route path='/doctor/*' element={<DoctorRoutes />} />
    </Routes>
  )
}

export default App
