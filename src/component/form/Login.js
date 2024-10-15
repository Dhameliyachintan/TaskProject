import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./Authprovider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6,}$/;

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      errors.password =
        "Password must be at least 6 characters long";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      login(storedUser.token); 
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 5000);
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <ToastContainer />
        <h4 className="text-center text-2xl font-bold mb-4">Login Page</h4>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className={`w-full p-2 border rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring focus:ring-blue-500`}
          />
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className={`w-full p-2 border rounded-md ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring focus:ring-blue-500`}
          />
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password}</div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
        >
          Login
        </button>

        <div className="mt-4 text-center">
          <p>
            Do not have an account?{" "}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => navigate("/registration")}
            >
              Registration
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
