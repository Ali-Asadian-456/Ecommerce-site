import React, { createContext, useState } from "react";

export const UserContext = createContext(); // Ensure this is exported correctly

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to store user data

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
