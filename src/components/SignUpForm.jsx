import React, { useState } from "react";
import { Button } from "./ui/button";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", email: "", password: "" });
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setErrors((prev) => ({
      ...prev,
      username: value ? "" : "Username is required",
    }));
  };

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

  const handleSubmit = async () => {
    if (!errors.username && !errors.email && !errors.password) {
      try {
        const response = await fetch("http://localhost:5000/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Signup failed");
        }
        const data = await response.json();
        setSuccessMessage("Sign-up successful!"); // Set success message
        setServerError(""); // Clear server error on success
      } catch (error) {
        setServerError(error.message); // Display server error message
        setSuccessMessage(""); // Clear success message on error
      }
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-2">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
        className="input border p-2 rounded"
      />
      {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
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
      {successMessage && <span className="text-green-500 text-sm">{successMessage}</span>}
      <Button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
        Sign Up
      </Button>
    </div>
  );
}

export default SignUpForm;
