import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext"; // Ensure correct import path

export default function UserEdit() {
  const { user, setUser } = useContext(UserContext); // Access user data from context
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(user?.password || ""); // New state for password
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({ email: "", password: "" });
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


  const handleUpdate = async () => {
    if (!errors.email && !errors.password) { // Ensure no validation errors
      try {
        const response = await fetch("http://localhost:5000/auth/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }), // Include password
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user); // Update user in context
          setMessage("Profile updated successfully!");
          setUsername(""); // Clear username input
          setEmail("");    // Clear email input
          setPassword(""); // Clear password input
        } else {
          const errorText = await response.text();
          setMessage(`Failed to update profile: ${errorText}`);
        }
      } catch (error) {
        setMessage("An error occurred while updating profile.");
      }
    } else {
      setMessage("Please fix validation errors before submitting.");
    }
  };

  return (
    <div>
      
      {user ? (
        <div>
          <p className="text-green-900 bg-violet-400 py-2 px-1 rounded">
            Username: {user.username}
          </p>
          <p className="text-green-900 mt-2 bg-pink-400 py-2 px-1 rounded">
            Email: {user.email}
          </p>
          <div className="mt-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="New Username"
              className="input border p-2 rounded mb-2"
            />
            <input
              type="email"
              value={email}
              onChange={handleEmailChange} // Add email validation handler
              placeholder="New Email"
              className="input border p-2 rounded mb-2"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="New Password"
              className="input border p-2 rounded mb-2"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Update Profile
            </button>
            {message && (
              <p
                className={`mt-2 ${
                  message.includes("successfully")
                    ? "text-green-500" // Success message color
                    : "text-red-500"   // Failure message color
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
       
      
    </div>
  );
}
