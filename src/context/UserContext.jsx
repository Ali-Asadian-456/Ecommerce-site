import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserFromServer = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/check", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user || null); // Safely update user state
      } else {
        const errorText = await response.text(); // Capture server error response
        console.error(
          `Failed to fetch user: ${response.status} ${response.statusText}. Server response: ${errorText}`
        );
        
        setUser(null); // Clear user state if unauthorized or server error
      }
    } catch (error) {
      console.error("Network error while fetching user:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUserFromServer(); // Fetch user only on initialization
  }
   , []
); // Empty dependency array ensures this runs only once

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};