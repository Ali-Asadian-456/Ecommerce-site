import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext"; // Ensure correct import path
import { Link, Outlet } from 'react-router-dom';


export default function Dashboard() {
 
  return (
    <div>
      <h1>Dashboard</h1>
      <div className=" flex flex-col gap-2 mb-10 mt-2 rounded-md ">
      <Link className="bg-blue-300 p-2 rounded" to="/dashboard/useredit">User Edit</Link> 
      <Link className="bg-blue-300 p-2 rounded" to="/dashboard/purchasehistory">Purchase History</Link>
      </div>
      <div className="bg-green-300 p-10">
      <Outlet />
      </div>
        
      
    </div>
  );
}
