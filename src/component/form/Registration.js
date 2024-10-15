import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6,}$/;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (!nameRegex.test(formData.name)) {
      errors.name = "Invalid name format";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Password must be at least 6 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const user = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    localStorage.setItem("user", JSON.stringify(user));
    toast.success("Registration successful");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name:
            </label>
            <input
              type="text"
              name="name"
              className={`w-full p-2 border rounded-md ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring focus:ring-blue-500`}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              className={`w-full p-2 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring focus:ring-blue-500`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password:
            </label>
            <input
              type="password"
              name="password"
              className={`w-full p-2 border rounded-md ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring focus:ring-blue-500`}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              className={`w-full p-2 border rounded-md ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring focus:ring-blue-500`}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <div className="text-red-500 text-sm">{errors.confirmPassword}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
          >
            Submit
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <button
              className="text-blue-500 hover:underline"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;