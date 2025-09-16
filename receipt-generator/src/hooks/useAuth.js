// hooks/useAuth.js
import { useState, useEffect } from "react";

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Example: localStorage me token check
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  return isLoggedIn;
}
