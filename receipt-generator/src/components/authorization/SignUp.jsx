import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Toast from "../common/Toast";

const SignUp = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  // Separate states for each field
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validate = () => {
    let newErrors = {};
    if (!form.fullName.trim())
      newErrors.fullName = "⚠️ Please enter your full name";
    if (!form.email.trim()) newErrors.email = "⚠️ Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "⚠️ Enter a valid email (e.g. user@example.com)";
    if (!form.password) newErrors.password = "⚠️ Password cannot be empty";
    else if (!passwordRegex.test(form.password))
      newErrors.password =
        "⚠️ Password must be 8+ chars with uppercase, lowercase, number & special symbol";
    if (!form.confirmPassword)
      newErrors.confirmPassword = "⚠️ Confirm your password";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "⚠️ Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    const API_URL = import.meta.env.VITE_API_URL;
    e.preventDefault();

    if (validate()) {
      setLoading(true);
      try {
        const res = await axios.post(`${API_URL}/signup`, {
          fullName: form.fullName,
          email: form.email,
          password: form.password,
        });

        // Success toast show karo
        setToast({ 
          message: "Account created successfully! Redirecting to login...", 
          type: "success" 
        });

        setTimeout(() => {
          setLoading(false);
          navigate("/signin");
        }, 2000);
        
      } catch (err) {
        setLoading(false);
        
        // Error toast show karo
        setToast({ 
          message: err.response?.data?.message || "Something went wrong! Please try again.", 
          type: "error" 
        });
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          noValidate
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-md"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 text-center">
            <h2 className="text-2xl font-bold">Create Your Account</h2>
            <p className="text-sm text-gray-200 mt-1">Join us and start your journey</p>
          </div>

          {/* Body */}
          <div className="p-8">
            {/* Full Name */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className={`w-full p-3 border rounded-xl focus:outline-none ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

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

            {/* Password */}
            <div className="mb-4 relative">
              <label className="block font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
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

            {/* Confirm Password */}
            <div className="mb-6 relative">
              <label className="block font-medium mb-1">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className={`w-full p-3 border rounded-xl focus:outline-none ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-sm text-blue-600 hover:underline"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white font-medium py-3 rounded-xl hover:bg-emerald-700 transition disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            {/* Footer */}
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <a href="/signin" className="text-blue-600 font-medium">
                Sign In
              </a>
            </p>
          </div>
        </form>
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

export default SignUp;