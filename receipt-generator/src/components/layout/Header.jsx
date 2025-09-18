import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Receipt,
  Store,
  HelpCircle,
} from "lucide-react";
import { AuthContext } from "@/context/AuthContext";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/signin");
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
                <span className="text-2xl font-bold text-gray-800">
                  ReceiptGen
                </span>
                <p className="text-sm text-gray-500">
                  Professional Receipt Generator
                </p>
              </div>
            </Link>
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
      </div>
    </nav>
  );
};

export default Header;
