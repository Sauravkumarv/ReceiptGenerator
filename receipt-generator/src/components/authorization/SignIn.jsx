import axios from "axios";
import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext"; 
import Toast from "../common/Toast";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [toast, setToast] = useState(null);
  const { setIsAuthenticated } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false); // 👈 state for toggle
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validate form
  const validate = () => {
    let newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = "⚠️ Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "⚠️ Enter a valid email (e.g. user@example.com)";
    }

    if (!form.password) {
      newErrors.password = "⚠️ Password cannot be empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Handle form submit
  const handleSubmit = async(e) => {
    const API_URL = import.meta.env.VITE_API_URL;
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const res = await axios.post(`${API_URL}/signin`, {
          email: form.email,
          password: form.password
        }, { withCredentials: true });
        
        setIsAuthenticated(true);
        
        // Toast show karo
        console.log("Setting success toast...");
        setToast({ 
          message: "Login successful! Redirecting to dashboard...", 
          type: "success" 
        });
        console.log("Toast state:", { message: "Login successful! Redirecting to dashboard...", type: "success" });
        
        setTimeout(() => {
          setLoading(false);
          navigate("/home");
        }, 2000); // Toast dekhne ka time
        
      } catch (err) {
        setLoading(false);
        // Error toast show karo
        console.log("Setting error toast...");
        setToast({ 
          message: err.response?.data?.message || "❌ Something went wrong!", 
          type: "error" 
        });
        console.log("Error toast state:", { 
          message: err.response?.data?.message || "❌ Something went wrong!", 
          type: "error" 
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-md"
      >
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 text-center">
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-sm text-gray-200 mt-1">Sign in to continue</p>
        </div>

        {/* Body */}
        <div className="p-8">
          {/* Email */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full p-3 border rounded-xl focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="user@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password with Show/Hide toggle */}
          <div className="mb-6 relative">
            <label className="block font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"} // 👈 toggle here
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full p-3 border rounded-xl focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-sm text-blue-600 hover:underline"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white font-medium py-3 rounded-xl hover:bg-emerald-700 transition disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Footer */}
          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 font-medium">
              Sign Up
            </a>
          </p>
        </div>
      </form>

      {/* Toast render - Yeh missing tha */}
      {console.log("Rendering toast component, toast state:", toast)}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default SignIn;