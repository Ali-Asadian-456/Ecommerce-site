import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext"; // Ensure correct import path
import { NavLink, Outlet } from 'react-router-dom'; // Updated import


export default function Dashboard() {
 
  return (
    <div>
      <h1 className="text-center text-xl font-bold">Dashboard</h1>
      <div className=" flex flex-col gap-2 mb-10 mt-2 rounded-md text-center font-semibold "> 
        <NavLink 
          className={({ isActive }) => 
            `p-2 rounded ${isActive ? 'bg-green-500 text-white' : 'bg-blue-100'}`
          } 
          to="/dashboard/useredit"
        >
          User Edit
        </NavLink> 
        <NavLink 
          className={({ isActive }) => 
            `p-2 rounded ${isActive ? 'bg-green-500 text-white' : 'bg-blue-100'}`
          } 
          to="/dashboard/purchasehistory"
        >
          Purchase History
        </NavLink>
      </div>
      <div className="">
      <Outlet />
      </div>
        
      
    </div>
  );
}
