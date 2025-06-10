import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    alert("Anda harus login terlebih dahulu untuk mengakses halaman ini");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
