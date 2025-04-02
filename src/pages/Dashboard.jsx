import React, { useContext } from "react";
import { UserContext } from "../context/UserContext"; // Ensure correct import path

export default function Dashboard() {
  const { user } = useContext(UserContext); // Access user data from context

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, {user.username}</p> {/* Use 'username' instead of 'name' */}
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
}
