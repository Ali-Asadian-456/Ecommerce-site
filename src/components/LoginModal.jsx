import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Button } from "./ui/button";

function LoginModal({ show, setShow }) {
  const handleClose = () => setShow(false);
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity ${
        show ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Authentication</h2>
          <button onClick={handleClose} className="text-gray-600">✕</button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex justify-center gap-4 mt-4">
            <TabsTrigger value="login" className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
              Sign Up
            </TabsTrigger>
          </TabsList>
          
          {/* همیشه `TabsContent`ها در DOM حضور دارند اما محتوای داخلشان شرطی رندر می‌شود */}
          <TabsContent value="login">
            {activeTab === "login" && (
              <div className="mt-4 flex flex-col gap-2">
                <input type="email" placeholder="Email" className="input border p-2 rounded" />
                <input type="password" placeholder="Password" className="input border p-2 rounded" />
                <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Login</Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="signup">
            {activeTab === "signup" && (
              <div className="mt-4 flex flex-col gap-2">
                <input type="text" placeholder="Username" className="input border p-2 rounded" />
                <input type="email" placeholder="Email" className="input border p-2 rounded" />
                <input type="password" placeholder="Password" className="input border p-2 rounded" />
                <Button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Sign Up</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default LoginModal;
