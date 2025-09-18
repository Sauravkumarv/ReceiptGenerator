// src/components/common/ProtectedRoute.js
import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import Toast from "./Toast";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [toast, setToast] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && window.location.pathname !== "/") {
      // Toast show karo
      setToast({ 
        message: "Please login first to access this page!", 
        type: "error" 
      });

      // 2 seconds baad redirect karo
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  // Agar authenticated nahi hai aur redirect time aa gaya
  if (!isAuthenticated && window.location.pathname !== "/" && shouldRedirect) {
    return <Navigate to="/signin" replace />;
  }

  // Agar authenticated nahi hai but redirect pending hai
  if (!isAuthenticated && window.location.pathname !== "/" && !shouldRedirect) {
    return (
      <>
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full mx-4">
            <div className="text-center">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Access Denied</h3>
              <p className="text-gray-600 text-sm mb-4">You need to be logged in to view this page</p>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-xs text-gray-500 mt-2">Redirecting to login...</p>
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
  }

  return children;
};

export default ProtectedRoute;