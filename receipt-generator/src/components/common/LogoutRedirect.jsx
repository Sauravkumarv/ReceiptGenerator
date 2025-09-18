import { Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import Toast from "../common/Toast";

const LogoutRedirect = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [toast, setToast] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      // Toast show karo
      setToast({ 
        message: "You are already logged out! Please login first.", 
        type: "error" 
      });

      // 2 seconds baad redirect karo
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  // Agar user already logged out hai aur redirect time aa gaya
  if (!isAuthenticated && shouldRedirect) {
    return <Navigate to="/signin" replace />;
  }

  // Agar user authenticated hai
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  // Toast show karne ke liye temporary render
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Checking authentication...</p>
          </div>
        </div>
      </div>

      {/* Toast Component */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default LogoutRedirect;