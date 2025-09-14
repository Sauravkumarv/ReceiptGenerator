import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Receipt,
  Store,
  HelpCircle,
  UserPlus,
  LogIn,
} from "lucide-react";

const Header = () => {
  const location = useLocation(); // to highlight active link
  const currentPath = location.pathname;

  return (
    <nav className="bg-white shadow-lg border-b-4 border-primary-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link
              to="/"
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
            {/* Home */}
            <Link
              to="/"
              className={`flex items-center space-x-2 transition-colors ${
                currentPath === "/"
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

            {/* Sign In */}
            <Link
              to="/signin"
              className={`flex items-center space-x-2 transition-colors ${
                currentPath === "/signin"
                  ? "text-primary-600 font-semibold"
                  : "text-gray-600 hover:text-primary-600"
              }`}
            >
              <LogIn className="h-5 w-5" />
              <span>Sign In</span>
            </Link>

            {/* Sign Up */}
            <Link
              to="/signup"
              className={`flex items-center space-x-2 transition-colors ${
                currentPath === "/signup"
                  ? "text-primary-600 font-semibold"
                  : "text-gray-600 hover:text-primary-600"
              }`}
            >
              <UserPlus className="h-5 w-5" />
              <span>Sign Up</span>
            </Link>
          </div>

          {/* Mobile menu button (you can expand later with dropdown) */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-primary-600">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;