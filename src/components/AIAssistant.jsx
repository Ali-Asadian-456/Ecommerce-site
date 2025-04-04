import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";

export default function AIAssistant() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [hasLoggedIn, setHasLoggedIn] = useState(false); // New state to track login
  const [chatId, setChatId] = useState(null); // New state to store chat ID
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchChatData = async (token) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/chats", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Connection: "keep-alive",
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate, br",
        },
        body: JSON.stringify({
          title: "newchat",
        }),
      });

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        if (response.ok) {
          let data;
          try {
            data = await response.json();
          } catch (parseError) {
            console.error("JSON parse error:", parseError);
            return;
          }
          //   console.log('Chat API Response:', data);
          setChatId(data.data.id);
        } else {
          console.error("Fetching chat data failed");
        }
      } else {
        const text = await response.text();
        console.error("Unexpected response format:", text);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogin = async () => {
    if (hasLoggedIn) return; // Prevent multiple login attempts
    setHasLoggedIn(true); // Mark login as attempted

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Connection: "keep-alive",
          Accept: "application/json",
          "Accept-Encoding": "gzip, deflate, br",
        },
        body: JSON.stringify({
          email: "12345678@gmail.com",
          password: "12345678",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // console.log('API Response:', data); // Debugging log
        setToken(data.data.token); // Correctly accessing the token inside `data`
        fetchChatData(data.data.token); // Fetch chat data after successful login
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w2-xt-center">
      <button
        className="fixed bottom-4 right-4 bg-gray-300 p-2 rounded flex items-center gap-2"
        onClick={() => {
          openModal();
          handleLogin();
        }}
      >
        AI Assistant
        <FaRobot className="text-lg" />
      </button>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center "
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 rounded relative w-[600px] min-h-[400px] flex flex-col  text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="cursor-pointer  ml-auto text-xl font-bold absolute top-2 right-2 text-red-600"
              onClick={closeModal}
            >
              &times;
            </span>
            <h2 className="text-green-800">مشاوره با هوش مصنوعی </h2>
            <div className="mb-2">
              {messages.map((msg, index) => (
                <div key={index}>{msg}</div>
              ))}
            </div>
            <div className="mt-auto">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="border p-1 mr-2 w-[400px]"
              />
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={async () => {
                  try {
                    const response = await fetch(
                      `http://127.0.0.1:8000/api/v1/chats/${chatId}/qa`,
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ question: userInput }),
                      }
                    );
                    if (response.ok) {
                      const data = await response.json();
                      setMessages((prev) => [
                        ...prev,
                        `You: ${userInput}`,
                        `Bot: ${data.data.response}`,
                      ]);
                      setUserInput("");
                    } else {
                      console.error("QA request failed");
                    }
                  } catch (err) {
                    console.error("Error:", err);
                  }
                }}
              >
                Send
              </button>
            </div>
            {token && (
              <>
                {/* {console.log('Token State:', token)} Debugging log */}
                {/* <p className="mt-4 text-green-500">Token: {token}</p> */}
              </>
            )}
            {chatId && (
              <div className="mt-4 text-blue-500">Chat ID: {chatId}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
