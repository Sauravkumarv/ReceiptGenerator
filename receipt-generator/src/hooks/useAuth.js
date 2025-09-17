import { useState, useEffect } from "react";

// Helper function to get cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Cookie se token check karte hain
    const token = getCookie("authToken");
    console.log("useAuth - Token:", token);
    setIsLoggedIn(!!token);
  }, []);

  return isLoggedIn;
}