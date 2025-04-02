import React, { useState, useContext } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Ensure correct import path
import Dashboard from '../pages/Dashboard';

function LoginForm({ closeModal, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [serverError, setServerError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({
      ...prev,
      email: value ? (emailRegex.test(value) ? "" : "Invalid email format") : "Email is required",
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({
      ...prev,
      password: value ? "" : "Password is required",
    }));
  };

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async () => {
    if (!errors.email && !errors.password) {
      try {
        const response = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }
        const data = await response.json();
        console.log("Login successful", data);
        if (data.user) {
          setUser(data.user); // Save user to context and local storage
          localStorage.setItem("user", JSON.stringify(data.user)); // Update local storage
          closeModal();
          navigate("/dashboard");
        } else {
          setServerError("Failed to retrieve user data.");
        }
      } catch (error) {
        setServerError(error.message);
      }
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-2">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        className="input border p-2 rounded"
      />
      {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        className="input border p-2 rounded"
      />
      {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
      {serverError && <span className="text-red-500 text-sm">{serverError}</span>}
      <Button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        Login
      </Button>
    </div>
  );
}

export default LoginForm;
