import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Receipt,
  Store,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import Toast from "../common/Toast";


const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const handleClick = () => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/signin");
    }
  };

  const handleLogout = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const res = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      // update context
      setIsAuthenticated(false);
      
      setToast({ 
        message: "Logout successful!", 
        type: "success" 
      });

      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      setToast({ 
        message: "Logout Failed!", 
        type: "error" 
      });
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b-4 border-primary-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link
              to={isAuthenticated ? "/home" : "/"}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="bg-primary-600 p-2 rounded-lg">
                <Receipt className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold text-gray-800">
                  ReceiptGen
                </span>
                <p className="text-xs sm:text-sm text-gray-500">
                  Professional Receipt Generator
                </p>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated && (
              <>
                {/* Home */}
                <Link
                  to="/home"
                  className={`flex items-center space-x-2 transition-colors ${
                    currentPath === "/home"
                      ? "text-primary-600 font-semibold"
                      : "text-gray-600 hover:text-primary-600"
                  }`}
                >
                  <Store className="h-5 w-5" />
                  <span>Home</span>
                </Link>

                {/* Help */}
                <Link
                  to="/help"
                  className={`flex items-center space-x-2 transition-colors ${
                    currentPath === "/help"
                      ? "text-primary-600 font-semibold"
                      : "text-gray-600 hover:text-primary-600"
                  }`}
                >
                  <HelpCircle className="h-5 w-5" />
                  <span>Help</span>
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className={`flex items-center space-x-2 transition-colors ${
                    currentPath === "/logout"
                      ? "text-primary-600 font-semibold"
                      : "text-gray-600 hover:text-primary-600"
                  }`}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            )}

            <button
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
              onClick={handleClick}
            >
              {isAuthenticated ? "Dashboard" : "Get Started"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} pb-4`}>
          <div className="flex flex-col space-y-4">
            {isAuthenticated && (
              <>
                {/* Home */}
                <Link
                  to="/home"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 transition-colors ${
                    currentPath === "/home"
                      ? "text-primary-600 font-semibold"
                      : "text-gray-600 hover:text-primary-600"
                  }`}
                >
                  <Store className="h-5 w-5" />
                  <span>Home</span>
                </Link>

                {/* Help */}
                <Link
                  to="/help"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 transition-colors ${
                    currentPath === "/help"
                      ? "text-primary-600 font-semibold"
                      : "text-gray-600 hover:text-primary-600"
                  }`}
                >
                  <HelpCircle className="h-5 w-5" />
                  <span>Help</span>
                </Link>

                {/* Logout */}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 transition-colors text-left ${
                    currentPath === "/logout"
                      ? "text-primary-600 font-semibold"
                      : "text-gray-600 hover:text-primary-600"
                  }`}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            )}

            <button
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all w-full"
              onClick={() => {
                handleClick();
                setIsMenuOpen(false);
              }}
            >
              {isAuthenticated ? "Dashboard" : "Get Started"}
            </button>
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
    </nav>
  );
};

export default Header;