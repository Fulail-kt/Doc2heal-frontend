import { Route, Navigate, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type prosRoute={
  element: React.ReactNode;
  roles?: string[];
}

const PrivateRoute:React.FC<prosRoute> = ({ element, roles }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" />;
  }

  const decode = jwtDecode<{ _id: string; role: string }>(token);
  const currentUserRole = decode.role;

  if (roles && !roles.includes(currentUserRole)) {
    // Redirect to unauthorized page if user does not have the required role
    return <Navigate to="/unauthorized" />;
  }

  // Render the protected component if the user has the required role
  return(
  <Routes>

    <Route element={element} />;

  </Routes>)
};

export default PrivateRoute;
