import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Button } from "./ui/button";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function LoginSignUpModal({ show, setShow }) {
  const closeModal = () => setShow(false);
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
          <button onClick={closeModal} className="text-gray-600">✕</button>
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
          
          <TabsContent value="login">
            {activeTab === "login" && <LoginForm closeModal={closeModal} />}
          </TabsContent>
          
          <TabsContent value="signup">
            {activeTab === "signup" && <SignUpForm />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default LoginSignUpModal;
