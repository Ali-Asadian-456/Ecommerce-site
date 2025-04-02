import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext"; // Ensure correct import path

export default function Dashboard() {
  const { user, setUser } = useContext(UserContext); // Access user data from context
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user); // Update user in context
        setMessage("Profile updated successfully!");
      } else {
        const errorText = await response.text();
        setMessage(`Failed to update profile: ${errorText}`);
      }
    } catch (error) {
      setMessage("An error occurred while updating profile.");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
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
              onChange={(e) => setEmail(e.target.value)}
              placeholder="New Email"
              className="input border p-2 rounded mb-2"
            />
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Update Profile
            </button>
            {message && <p className="text-red-500 mt-2">{message}</p>}
          </div>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
}
