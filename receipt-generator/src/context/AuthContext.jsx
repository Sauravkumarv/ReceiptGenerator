import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// Helper function to get cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

export const AuthProvider = ({ children }) => {
  // Initial state mein hi cookie check karo
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = getCookie("authToken");
    
    return !!token;
  });

  // Page load hone par cookie check karo
  useEffect(() => {
    const token = getCookie("authToken");
   
    
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};