// src/components/common/ProtectedRoute.js
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); // token नहीं, isAuthenticated use करो

  if (!isAuthenticated) {
    alert("⚠️ Please login first!");
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;