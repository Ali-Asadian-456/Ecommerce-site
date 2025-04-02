import React, { useContext } from "react";
import { UserContext } from "../context/UserContext"; // Ensure correct import path

export default function Dashboard() {
  const { user } = useContext(UserContext); // Access user data from context


  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <p className="text-green-900 bg-violet-400 py-2 px-1 rounded" >Username: {user.username}</p> {/* Use 'username' instead of 'name' */}
          <p className="text-green-900 mt-2 bg-pink-400 py-2 px-1 rounded">Email: {user.email}</p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
}
